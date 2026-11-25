import Image from "next/image";
import Link from "next/link";
import portraitWorkbench from "@/assets/portrait-workbench.jpg";
import { Button } from "@/components/Button/Button";
import { Navigation } from "@/components/Navigation/Navigation";

const navItems = [
  { label: "Кейси", href: "#cases" },
  { label: "Виступи", href: "#talks" },
  { label: "Про мене", href: "#about" },
  { label: "Контакти", href: "#contact" },
];

/** Hand-written notes for the numbered theses (placeholders until the service list is final). */
const handNotes = ["пости, банери, розсилки", "плагіни й скрипти за клік", "воркшопи для редакцій"];

/** Two-digit footnote number: 1 → "01". */
function footnote(n: number) {
  return String(n).padStart(2, "0");
}

/** Key thesis with a highlighter mark and a small footnote-style number. */
function highlight(text: string, n: number) {
  return (
    <>
      <mark className="bg-accent text-ink box-decoration-clone">{text}</mark>
      <sup className="font-mono text-caption text-accent-ink">{footnote(n)}</sup>
    </>
  );
}

/** Hand-drawn arrow from the design, pointing up-left at the title. */
function ScribbleArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 67.631 57.2131"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="w-16"
    >
      <path d="M67.25 56.0225C42.25 48.0225 17.25 30.0225 1.25 2.02254M17.25 10.0225L1.25 2.02254V21.0225" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-grid">
      <header className="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 py-6">
        <Link
          href="/"
          className="flex items-center font-mono text-lead outline-ink focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          maxharmash
          <span aria-hidden="true" className="h-6 w-3 bg-accent motion-safe:animate-blink" />
        </Link>
        <div className="flex items-center gap-8">
          <Navigation items={navItems} />
          <div className="hidden md:block">
            <Button variant="secondary" href="#contact">
              Написати
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-page px-4 pb-section">
        <section
          aria-labelledby="hero-title"
          className="mt-8 grid gap-8 md:mt-section md:grid-cols-12 md:gap-6"
        >
          <div className="relative flex flex-col items-start gap-6 md:col-span-8">
            <p className="flex items-center gap-3 font-mono text-caption uppercase text-accent-ink">
              <span className="border border-accent-ink px-2">01</span>
              AI для медіа й команд
            </p>
            <h1 id="hero-title" className="font-mono text-heading md:text-display">
              Автоматизую рутину медіа й команд з&nbsp;AI&#8209;агентами
            </h1>
            <p className="font-sans text-lead text-ink-muted">
              Рішення — за людьми, рутина — за агентами.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" href="#contact">
                Розказати про задачу →
              </Button>
              <Button size="lg" variant="secondary" href="#cases">
                Дивитись кейси
              </Button>
            </div>

            {/* Hand-written note: decorative, only where there is room for it. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4/5 top-1/3 hidden text-accent xl:block"
            >
              <ScribbleArrow />
              <span className="block rotate-4 whitespace-nowrap font-hand text-heading">
                це головне!
              </span>
            </div>
          </div>

          <div
            role="img"
            aria-label="Фото (плейсхолдер)"
            className="aspect-portrait w-full bg-line md:col-span-4 md:w-5/6 md:justify-self-end"
          />
        </section>

        <section
          aria-labelledby="services-title"
          className="mt-section grid gap-8 md:grid-cols-12 md:gap-6"
        >
          <h2
            id="services-title"
            className="flex items-center gap-3 font-mono text-caption uppercase text-accent-ink md:col-span-12"
          >
            <span className="border border-accent-ink px-2">02</span>
            Що я роблю
          </h2>

          <div className="flex flex-col gap-8 md:col-span-8">
            {/* Manifesto: muted context, key theses in ink with a highlighter. */}
            <p className="font-sans text-statement text-ink-muted">
              Щодня команди витрачають години на те, що можна віддати машині.{" "}
              <span className="text-ink">
                Я налаштовую {highlight("агентів для контенту", 1)}, роблю{" "}
                {highlight("інструменти за один клік", 2)} і вчу{" "}
                {highlight("редакції працювати з AI", 3)}.
              </span>{" "}
              Людям лишається робота, яку може зробити тільки людина.
            </p>

            {/* Hand-written margin notes for the numbered theses, like notes pinned to a board. */}
            <ol className="flex flex-wrap gap-x-8 gap-y-2 font-hand text-lead text-accent-ink md:text-heading">
              {handNotes.map((note, index) => (
                <li key={note} className={index % 2 ? "rotate-1" : "-rotate-2"}>
                  {footnote(index + 1)} — {note}
                </li>
              ))}
            </ol>
          </div>

          {/* Photo pinned to the board like a sticker: frame, tape, slight tilt, offset down. */}
          <div className="relative w-5/6 justify-self-center rotate-2 border border-line bg-surface p-3 md:col-span-4 md:mt-section md:w-full md:justify-self-start">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 bg-accent"
            />
            <Image
              src={portraitWorkbench}
              alt="Людина схилилася над верстаком і креслить олівцем, на стіні позаду приколоті ескізи інтерфейсів"
              placeholder="blur"
              sizes="(min-width: 768px) 33vw, 85vw"
              className="aspect-portrait w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-8 -left-6 -rotate-6 whitespace-nowrap font-hand text-heading text-accent"
            >
              це я!
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
