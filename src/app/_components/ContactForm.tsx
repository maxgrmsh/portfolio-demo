"use client";

import { useActionState, useEffect, useRef } from "react";
import type { FormEvent, MouseEvent } from "react";
import { submitContact } from "@/app/actions/contact";
import type { ContactField, ContactState } from "@/app/actions/contact";
import { Button } from "@/components/Button/Button";
import { FormField } from "@/components/FormField/FormField";

// Тексти з таблиці текстів форми.
const TEXT = {
  name: "Ім'я",
  email: "Ваша пошта",
  message: "Повідомлення",
  messageHint: "до 1000 символів",
  submit: "Надіслати заявку",
  pending: "Надсилаю…",
  responseTime: "Відповідаю протягом одного робочого дня",
  summaryTitle: "Перевірте форму",
  success: "Дякую, заявку отримав. Відповім на вашу пошту протягом одного робочого дня",
  honeypot: "Не заповнюйте це поле",
};

const FIELD_ORDER: ContactField[] = ["name", "email", "message"];
const fieldId = (field: ContactField) => `contact-${field}`;

const initialState: ContactState = {
  status: "idle",
  errors: {},
  values: { name: "", email: "", message: "" },
  attempt: 0,
};

/**
 * Форма заявки. Помилки зʼявляються лише після натискання кнопки: зведенням над формою
 * і текстом біля поля. Введене не стирається: сервер повертає значення, поля беруть їх через defaultValue.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  // Скасовує повторне надсилання, поки триває попереднє.
  const submittingRef = useRef(false);

  const sent = state.status === "sent";
  const failed = state.status === "failed";
  const errorFields = FIELD_ORDER.filter((field) => state.errors[field]);

  useEffect(() => {
    submittingRef.current = false;
    if (state.status === "invalid") summaryRef.current?.focus();
    // Успіх (форма зникла разом із кнопкою) або збій: фокус переходить на повідомлення.
    if (state.status === "sent" || state.status === "failed") statusRef.current?.focus();
  }, [state.attempt, state.status]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (submittingRef.current) {
      event.preventDefault();
      return;
    }
    submittingRef.current = true;
  }

  // Посилання зі зведення ставить фокус на поле, а не лише прокручує до нього.
  function focusField(event: MouseEvent<HTMLAnchorElement>, field: ContactField) {
    const target = document.getElementById(fieldId(field));
    if (!target) return;
    event.preventDefault();
    target.focus();
    target.scrollIntoView({ block: "center" });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Контейнер є на сторінці завжди: так скрінрідер оголосить текст, що зʼявиться в ньому. */}
      <div
        ref={statusRef}
        role="status"
        tabIndex={-1}
        className="outline-ink focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {sent && <p className="font-sans text-lead text-ink">{TEXT.success}</p>}
        {failed && (
          <p className="border-2 border-danger bg-surface p-4 font-sans text-body text-danger">
            <span className="sr-only">Помилка: </span>
            {state.failure}
          </p>
        )}
      </div>

      {!sent && (
        <>
          {errorFields.length > 0 && (
            <div
              ref={summaryRef}
              tabIndex={-1}
              aria-labelledby="contact-summary-title"
              className="flex flex-col gap-3 border-2 border-danger bg-surface p-4 outline-ink focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <h3 id="contact-summary-title" className="font-mono text-caption uppercase text-danger">
                {TEXT.summaryTitle}
              </h3>
              <ul className="flex flex-col gap-2">
                {errorFields.map((field) => (
                  <li key={field}>
                    <a
                      href={`#${fieldId(field)}`}
                      onClick={(event) => focusField(event, field)}
                      className="font-sans text-body text-danger underline outline-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      {state.errors[field]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form
            action={formAction}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6"
          >
            <FormField
              id={fieldId("name")}
              name="name"
              label={TEXT.name}
              autoComplete="name"
              defaultValue={state.values.name}
              error={Boolean(state.errors.name)}
              errorText={state.errors.name}
            />
            <FormField
              id={fieldId("email")}
              name="email"
              type="email"
              label={TEXT.email}
              autoComplete="email"
              defaultValue={state.values.email}
              error={Boolean(state.errors.email)}
              errorText={state.errors.email}
            />
            <FormField
              id={fieldId("message")}
              name="message"
              multiline
              rows={6}
              label={TEXT.message}
              hint={TEXT.messageHint}
              defaultValue={state.values.message}
              error={Boolean(state.errors.message)}
              errorText={state.errors.message}
            />

            {/* Пастка для ботів: поза екраном, поза Tab, прихована від скрінрідерів. */}
            <div aria-hidden="true" className="sr-only">
              <label htmlFor="contact-hp-check">{TEXT.honeypot}</label>
              <input
                id="contact-hp-check"
                type="text"
                name="hp_check"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            <div className="flex flex-col gap-3 md:items-start">
              {/* У Button немає стану loading: на час надсилання він вимкнений і показує «Надсилаю…». */}
              <Button type="submit" size="lg" disabled={pending}>
                {pending ? TEXT.pending : TEXT.submit}
              </Button>
              <p className="font-sans text-caption text-ink-muted">{TEXT.responseTime}</p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
