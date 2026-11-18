"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "../Button/Button";

export interface NavigationItem {
  /** Текст пункту меню. */
  label: string;
  /** Адреса сторінки або якоря: `/works`, `#contact`. */
  href: string;
}

export interface NavigationProps {
  /** Пункти меню в порядку показу. */
  items?: NavigationItem[];
  /**
   * `href` поточної сторінки. Цей пункт підсвічується як активний
   * і отримує `aria-current="page"`. На сайті передавай поточний шлях.
   */
  activeHref?: string;
  /** Назва меню для скрінрідерів (`aria-label` у `<nav>`). */
  label?: string;
}

export const defaultNavigationItems: NavigationItem[] = [
  { label: "Роботи", href: "/works" },
  { label: "Про мене", href: "/about" },
  { label: "Контакти", href: "/contact" },
];

const itemBase =
  "inline-flex border-b-2 py-2 font-mono text-caption uppercase transition-colors " +
  "outline-ink focus-visible:outline-2 focus-visible:outline-offset-2";
const itemIdle = "border-transparent text-ink hover:text-accent-ink";
const itemActive = "border-accent-ink text-accent-ink";

/**
 * Навігація сайту: пункти меню з активним станом. На широкому екрані —
 * рядок посилань; на вузькому — кнопка «Меню», що відкриває список поверх
 * контенту. Закривається клавішею Escape, кліком поза меню або вибором пункту.
 */
export function Navigation({
  items = defaultNavigationItems,
  activeHref,
  label = "Головне меню",
}: NavigationProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleId = useId();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById(toggleId)?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, toggleId]);

  const renderItem = (item: NavigationItem) => {
    const active = item.href === activeHref;
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`${itemBase} ${active ? itemActive : itemIdle}`}
          onClick={() => setOpen(false)}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <nav ref={rootRef} aria-label={label} className="relative">
      {/* Wide screen: inline list */}
      <ul className="hidden items-center gap-8 md:flex">{items.map(renderItem)}</ul>

      {/* Narrow screen: toggle + overlay panel */}
      <div className="md:hidden">
        <Button
          id={toggleId}
          variant="secondary"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Закрити" : "Меню"}
        </Button>

        {open && (
          <ul
            id={panelId}
            className="absolute right-0 top-full z-10 mt-2 flex min-w-max flex-col gap-2 rounded-card border border-line bg-surface px-6 py-4"
          >
            {items.map(renderItem)}
          </ul>
        )}
      </div>
    </nav>
  );
}
