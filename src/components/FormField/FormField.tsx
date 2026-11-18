import { useId } from "react";
import type { InputHTMLAttributes } from "react";

export interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id"> {
  /** Підпис поля. Завжди стоїть над полем і звʼязаний з ним через `htmlFor`. */
  label: string;
  /** Тип поля: `text`, `email`, `tel`, `url`. */
  type?: "text" | "email" | "tel" | "url";
  /** Початкове значення. Якщо задане, поле показується заповненим. */
  defaultValue?: string;
  /** Підказка всередині порожнього поля (колір `ink-muted`). Не замінює підпис. */
  placeholder?: string;
  /** Стан помилки: межа `danger`, під полем іконка й текст помилки, `aria-invalid`. */
  error?: boolean;
  /** Текст помилки під полем. Показується лише коли `error`. Звʼязаний з полем через `aria-describedby`. */
  errorText?: string;
  /** Вимикає поле (атрибут `disabled`): сіре, не редагується, не потрапляє у фокус. */
  disabled?: boolean;
  /** Власний `id` поля. Якщо не задано, створюється автоматично. */
  id?: string;
}

const inputBase =
  "w-full rounded-control border-2 px-4 py-3 font-sans text-body " +
  "placeholder:text-ink-muted transition-colors " +
  "outline-ink focus:outline-2 focus:outline-offset-2";

// Background and text colour live only in state classes, so they never compete.
const inputNormal = "bg-surface text-ink border-ink-muted hover:border-ink focus:border-ink";
const inputError = "bg-surface text-ink border-danger";
const inputDisabled = "cursor-not-allowed border-line bg-line text-ink-muted";

/**
 * Текстове поле форми з підписом над ним, станами помилки й вимкнення.
 * Будується лише з токенів `@theme`.
 */
export function FormField({
  label,
  type = "text",
  error = false,
  errorText,
  disabled = false,
  id,
  "aria-describedby": describedBy,
  ...rest
}: FormFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const showError = error && !disabled && Boolean(errorText);

  const stateClass = disabled ? inputDisabled : error ? inputError : inputNormal;
  const describedByIds =
    [describedBy, showError ? errorId : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={inputId}
        className={`font-mono text-caption uppercase ${disabled ? "text-ink-muted" : "text-ink"}`}
      >
        {label}
      </label>

      <input
        id={inputId}
        type={type}
        disabled={disabled}
        aria-invalid={error && !disabled ? true : undefined}
        aria-describedby={describedByIds}
        className={`${inputBase} ${stateClass}`}
        {...rest}
      />

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
          <span>{errorText}</span>
        </p>
      )}
    </div>
  );
}
