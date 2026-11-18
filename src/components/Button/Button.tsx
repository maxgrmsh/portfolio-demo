"use client";

import Link from "next/link";
import { useId } from "react";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "disabled"> {
  /** Текст кнопки. Пишеться звичайним регістром, у верхній регістр переводить сама кнопка. */
  children: ReactNode;
  /**
   * Вигляд. `primary` — заливка `accent`, головна дія на екрані.
   * `secondary` — без заливки, з межею `ink-muted`, другорядна дія.
   */
  variant?: ButtonVariant;
  /** Розмір. `md` — звичайний (шапка, картки, форми); `lg` — великий (hero, заклик до дії). */
  size?: ButtonSize;
  /**
   * Вимикає кнопку через `aria-disabled`: вона лишається у фокусі клавіатури,
   * але не реагує на клік. Атрибут `disabled` навмисно не використовується.
   */
  disabled?: boolean;
  /**
   * Пояснення, чому кнопка вимкнена. Показується під кнопкою лише коли `disabled`,
   * і зв'язується з нею через `aria-describedby`, тож його читає скрінрідер.
   */
  disabledReason?: string;
  /**
   * Адреса переходу. Якщо задана, кнопка стає посиланням (`next/link`),
   * наприклад `#contact` або `/works`. Без неї це звичайна `<button>`.
   */
  href?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap " +
  "rounded-control border-2 font-mono text-caption uppercase transition-colors " +
  // Outline colour is constant so it does not animate; only style/width appear on focus.
  "outline-ink focus-visible:outline-2 focus-visible:outline-offset-2";

const sizes: Record<ButtonSize, string> = {
  md: "px-4 py-3",
  lg: "px-6 py-4",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-ink hover:border-ink hover:bg-ink hover:text-canvas",
  secondary:
    "border-ink-muted bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-canvas",
};

const disabledStyle = "cursor-not-allowed border-line bg-line text-ink-muted";

/**
 * Кнопка дизайн-системи для головних і другорядних дій
 * («Написати», «Дивитись роботи»). Прямі кути, моноширинний шрифт
 * верхнім регістром. Будується лише з токенів `@theme`.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  disabledReason,
  href,
  type = "button",
  onClick,
  "aria-describedby": describedBy,
  ...rest
}: ButtonProps) {
  const reasonId = useId();
  const showReason = disabled && Boolean(disabledReason);

  const className = [base, sizes[size], disabled ? disabledStyle : variants[variant]].join(" ");
  const describedByIds =
    [describedBy, showReason ? reasonId : undefined].filter(Boolean).join(" ") || undefined;

  let control: ReactNode;

  if (disabled) {
    // aria-disabled keeps the control focusable; clicks are swallowed.
    const block = (event: MouseEvent) => event.preventDefault();
    control = href ? (
      <a
        role="link"
        tabIndex={0}
        aria-disabled="true"
        aria-describedby={describedByIds}
        className={className}
        onClick={block}
      >
        {children}
      </a>
    ) : (
      <button
        type={type}
        aria-disabled="true"
        aria-describedby={describedByIds}
        className={className}
        onClick={block}
        {...rest}
      >
        {children}
      </button>
    );
  } else if (href) {
    control = (
      <Link href={href} aria-describedby={describedByIds} className={className}>
        {children}
      </Link>
    );
  } else {
    control = (
      <button
        type={type}
        aria-describedby={describedByIds}
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }

  if (!showReason) return control;

  return (
    <span className="inline-flex flex-col items-start gap-2">
      {control}
      <span id={reasonId} className="font-sans text-caption text-ink-muted">
        {disabledReason}
      </span>
    </span>
  );
}
