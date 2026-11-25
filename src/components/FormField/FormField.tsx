import { useId } from "react";
import type {
  HTMLInputAutoCompleteAttribute,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface FormFieldOwnProps {
  /** Підпис поля. Завжди стоїть над полем і звʼязаний з ним через `htmlFor`. */
  label: string;
  /** Початкове значення. Якщо задане, поле показується заповненим. */
  defaultValue?: string;
  /** Підказка всередині порожнього поля (колір `ink-muted`). Не замінює підпис. */
  placeholder?: string;
  /**
   * Підказка браузеру для автозаповнення: `name`, `email`, `tel`, `url`, `organization`, `off` тощо.
   * Працює і для однорядкового, і для багаторядкового поля.
   */
  autoComplete?: HTMLInputAutoCompleteAttribute;
  /**
   * Підказка під полем (колір `ink-muted`), наприклад ліміт символів. Звʼязана з полем через `aria-describedby`.
   * Поки показано текст помилки, підказку замінює він.
   */
  hint?: string;
  /** Стан помилки: межа `danger`, під полем іконка й текст помилки, `aria-invalid`. */
  error?: boolean;
  /**
   * Текст помилки під полем. Показується лише коли `error`. Звʼязаний з полем через `aria-describedby`.
   * Скрінрідер читає його з візуально прихованим префіксом «Помилка:».
   */
  errorText?: string;
  /** Вимикає поле (атрибут `disabled`): сіре, не редагується, не потрапляє у фокус. */
  disabled?: boolean;
  /**
   * Власний `id` поля. На нього можна посилатися зі зведення помилок (`href="#id"`).
   * Текст помилки отримує id `<id>-error`, підказка — `<id>-hint`. Якщо не задано, створюється автоматично.
   */
  id?: string;
  /** Висота багаторядкового поля в рядках. Для однорядкового не діє. */
  rows?: number;
}

type OwnKeys = keyof FormFieldOwnProps | "className";

export type FormFieldInputProps = FormFieldOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, OwnKeys | "type"> & {
    /** Однорядкове поле (`<input>`). */
    multiline?: false;
    /** Тип однорядкового поля: `text`, `email`, `tel`, `url`. */
    type?: "text" | "email" | "tel" | "url";
  };

export type FormFieldTextareaProps = FormFieldOwnProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, OwnKeys> & {
    /** Багаторядкове поле (`<textarea>`) для повідомлення. */
    multiline: true;
    type?: never;
  };

export type FormFieldProps = FormFieldInputProps | FormFieldTextareaProps;

const fieldBase =
  "block w-full rounded-control border-2 px-4 py-3 font-sans text-body " +
  "placeholder:text-ink-muted transition-colors " +
  "outline-ink focus:outline-2 focus:outline-offset-2";

// The textarea grows only vertically, so it never breaks the column width.
const textareaExtra = "resize-y";

// Background and text colour live only in state classes, so they never compete.
const fieldNormal = "bg-surface text-ink border-ink-muted hover:border-ink focus:border-ink";
const fieldError = "bg-surface text-ink border-danger";
const fieldDisabled = "cursor-not-allowed border-line bg-line text-ink-muted";

/**
 * Поле форми з підписом над ним: однорядкове або багаторядкове (`multiline`),
 * зі станами помилки й вимкнення. Будується лише з токенів `@theme`.
 */
export function FormField({
  label,
  type = "text",
  multiline = false,
  rows = 5,
  error = false,
  errorText,
  hint,
  disabled = false,
  id,
  "aria-describedby": describedBy,
  ...rest
}: FormFieldProps) {
  const autoId = useId();
  const fieldId = id || autoId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const showError = error && !disabled && Boolean(errorText);
  const showHint = !showError && Boolean(hint);

  const stateClass = disabled ? fieldDisabled : error ? fieldError : fieldNormal;
  const describedByIds =
    [describedBy, showError ? errorId : undefined, showHint ? hintId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const sharedProps = {
    id: fieldId,
    disabled,
    "aria-invalid": error && !disabled ? true : undefined,
    "aria-describedby": describedByIds,
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={fieldId}
        className={`font-mono text-caption uppercase ${disabled ? "text-ink-muted" : "text-ink"}`}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          {...sharedProps}
          rows={rows}
          className={`${fieldBase} ${textareaExtra} ${stateClass}`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          {...sharedProps}
          type={type}
          className={`${fieldBase} ${stateClass}`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {showHint && (
        <p id={hintId} className="font-sans text-caption text-ink-muted">
          {hint}
        </p>
      )}

      {showError && (
        <p id={errorId} className="flex items-start gap-2 font-sans text-caption text-danger">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4 shrink-0"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v5h-1.5v-5Zm0 6h1.5V12h-1.5v-1.5Z" />
          </svg>
          <span>
            <span className="sr-only">Помилка: </span>
            {errorText}
          </span>
        </p>
      )}
    </div>
  );
}
