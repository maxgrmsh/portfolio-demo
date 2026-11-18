import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";

export interface WorkCardProps {
  /** Назва роботи або продукту. */
  title: string;
  /** Короткий опис: один рядок про задачу чи результат. */
  description: string;
  /** Адреса сторінки кейса. Уся картка — одне посилання. */
  href: string;
  /**
   * Обкладинка, імпортована з `src/assets`:
   * `import cover from "@/assets/cover.jpg"`. Не з `public/`.
   */
  cover: StaticImageData;
  /** Опис обкладинки для скрінрідерів. Порожній рядок, якщо картинка лише декоративна. */
  coverAlt: string;
}

/**
 * Картка роботи для сітки кейсів: обкладинка у пропорції `aspect-cover`,
 * назва й короткий опис. Уся картка клікабельна й веде на сторінку кейса.
 */
export function WorkCard({ title, description, href, cover, coverAlt }: WorkCardProps) {
  return (
    <Link
      href={href}
      className={
        "group flex flex-col gap-3 rounded-card " +
        "outline-ink focus-visible:outline-2 focus-visible:outline-offset-2"
      }
    >
      <Image
        src={cover}
        alt={coverAlt}
        placeholder="blur"
        sizes="(min-width: 768px) 33vw, 100vw"
        className="aspect-cover w-full rounded-card border border-line object-cover transition-colors group-hover:border-ink"
      />
      <span className="flex flex-col gap-2">
        <span className="font-mono text-body text-ink transition-colors group-hover:text-accent-ink">
          {title}
        </span>
        <span className="font-sans text-body text-ink-muted">{description}</span>
      </span>
    </Link>
  );
}
