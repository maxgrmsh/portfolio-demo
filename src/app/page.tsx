import Link from "next/link";
import coverBrand from "@/assets/work-cover-brand.jpg";
import coverDashboard from "@/assets/work-cover-dashboard.jpg";
import coverPlugin from "@/assets/work-cover-plugin.jpg";
import { Button } from "@/components/Button/Button";
import { Navigation } from "@/components/Navigation/Navigation";
import { WorkCard } from "@/components/WorkCard/WorkCard";

const navItems = [
  { label: "Кейси", href: "#cases" },
  { label: "Виступи", href: "#talks" },
  { label: "Про мене", href: "#about" },
  { label: "Контакти", href: "#contact" },
];

const cases = [
  {
    title: "Тренінг ЦЕДЕМ",
    description: "Менше рутини в роботі журналіста",
    href: "#cases",
    cover: coverDashboard,
    coverAlt: "",
  },
  {
    title: "Система бренду в коді",
    description: "Тексти й рендер — на агентах",
    href: "#cases",
    cover: coverBrand,
    coverAlt: "",
  },
  {
    title: "Figma-плагін",
    description: "Український плейсхолдер за клік",
    href: "#cases",
    cover: coverPlugin,
    coverAlt: "",
  },
];

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

        <section id="cases" aria-labelledby="cases-title" className="mt-section flex flex-col gap-4">
          <h2 id="cases-title" className="font-mono text-caption uppercase text-ink-muted">
            Кейси
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {cases.map((item) => (
              <li key={item.title}>
                <WorkCard {...item} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
