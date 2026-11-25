"use server";

import { Resend } from "resend";

export type ContactField = "name" | "email" | "message";
export type ContactValues = Record<ContactField, string>;

export type ContactState = {
  status: "idle" | "invalid" | "sent" | "failed";
  /** Повідомлення про збій надсилання (лише коли `failed`). */
  failure?: string;
  /** Тексти помилок по полях. */
  errors: Partial<Record<ContactField, string>>;
  /** Введені значення: React 19 скидає некеровані поля після action, тож повертаємо їх назад. */
  values: ContactValues;
  /** Номер відповіді: форма переводить фокус лише після нової відповіді сервера. */
  attempt: number;
};

const MESSAGE_LIMIT = 1000;
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Тексти з таблиці текстів форми.
const ERRORS = {
  nameEmpty: "Введіть ім'я",
  emailEmpty: "Введіть вашу пошту",
  emailFormat: "Введіть пошту у форматі name@example.com",
  messageEmpty: "Напишіть, який процес хочете автоматизувати",
  messageTooLong: `Повідомлення має бути не довшим за ${MESSAGE_LIMIT} символів`,
};

/** Назва поля-пастки: нейтральна, щоб браузер не підставив туди автозаповнення. */
const TRAP_FIELD = "hp_check";

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validate(values: ContactValues) {
  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = ERRORS.nameEmpty;
  if (!values.email) errors.email = ERRORS.emailEmpty;
  else if (!EMAIL_FORMAT.test(values.email)) errors.email = ERRORS.emailFormat;
  if (!values.message) errors.message = ERRORS.messageEmpty;
  else if (values.message.length > MESSAGE_LIMIT) errors.message = ERRORS.messageTooLong;
  return errors;
}

/**
 * Серверна функція форми заявки. Перевіряє поля тими самими правилами, що й показує форма
 * (сервер не довіряє браузеру), потім надсилає лист через Resend.
 * Ключ — RESEND_API_KEY, пошта отримувача — CONTACT_EMAIL (.env.local і змінні на Vercel).
 */
export async function submitContact(
  prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const attempt = prev.attempt + 1;
  const values: ContactValues = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    message: read(formData, "message"),
  };

  // Пастка заповнена — це бот: відповідаємо як на успіх, але нічого не робимо.
  if (read(formData, TRAP_FIELD)) {
    return { status: "sent", errors: {}, values: { name: "", email: "", message: "" }, attempt };
  }

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values, attempt };
  }

  const to = process.env.CONTACT_EMAIL;
  // Текст збою з таблиці текстів форми, із запасною поштою.
  const failure = to
    ? `Заявка не надіслалась. Спробуйте ще раз або напишіть мені на ${to}`
    : "Заявка не надіслалась. Спробуйте ще раз";

  // Будь-яка помилка (немає ключа чи пошти, виняток, error у відповіді Resend) — збій, а не успіх.
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not set");
    if (!to) throw new Error("CONTACT_EMAIL is not set");

    // Клієнт створюємо тут: без ключа конструктор кидає виняток, і на рівні файлу це ламало б сторінку.
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Портфоліо <onboarding@resend.dev>",
      to,
      replyTo: values.email,
      subject: `Заявка з сайту від ${values.name}`,
      text: `Ім'я: ${values.name}\nПошта: ${values.email}\n\nПовідомлення:\n${values.message}`,
    });
    if (error) {
      console.error("Resend повернув помилку:", error.name, error.message);
      return { status: "failed", failure, errors: {}, values, attempt };
    }
  } catch (exception) {
    // Лише назва й текст винятку: ключ у лог не потрапляє.
    const { name, message } =
      exception instanceof Error ? exception : { name: "Error", message: String(exception) };
    console.error("Заявку не надіслано:", name, message);
    return { status: "failed", failure, errors: {}, values, attempt };
  }

  return { status: "sent", errors: {}, values, attempt };
}
