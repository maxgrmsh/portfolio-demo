@AGENTS.md

# portfolio-demo

Сайт-портфоліо UI-дизайнера.

## Стек

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4 (токени в блоці `@theme` у `src/app/globals.css`)

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт (Vercel деплоїть кожен пуш), тому перед пушем завжди питай мене.

## Токени

Єдине джерело значень: блок `@theme` у `src/app/globals.css`. Огляд у Storybook: `Foundations/Tokens` (`src/tokens/Tokens.mdx`). Стандартні палітра, розміри тексту, радіуси й шрифти Tailwind скинуті.

- Кольори: `canvas` (фон сторінки), `surface` (картки й поля), `line` (декоративні лінії й рамки карток), `accent` (заливки, іконки, великі декоративні елементи; не для дрібного тексту), `accent-ink` (акцентний текст на `canvas`/`surface`), `ink` (текст, темні заливки), `ink-muted` (другорядний текст; межа поля й кнопки без заливки), `danger` (текст і межа поля з помилкою).
- Текст на заливці `ink` — колір `canvas`; текст на заливці `accent` — колір `ink`.
- Шрифти: `font-mono` (Martian Mono 500/700: заголовки, меню, кнопки, мітки), `font-sans` (Geologica 400: основний текст), `font-hand` (Caveat 700: рукописні примітки). Підключення в `src/app/fonts.ts`, латиниця й кирилиця.
- Розміри тексту: `text-caption`, `text-body`, `text-lead`, `text-display` (кожен разом із висотою рядка, трекінгом і жирністю). `text-heading` ще не визначено.
- Радіуси: `rounded-control`, `rounded-card` (обидва 0, кути прямі).
- Пропорції: `aspect-cover` (21:8, обкладинка кейса), `aspect-portrait` (5:6, портрет).
- Відступи: тільки 8, 12, 16, 24, 32 px, тобто 2, 3, 4, 6, 8 у класах.

## Компоненти

Кожен компонент лежить у `src/components/<Назва>/` разом з історією `<Назва>.stories.tsx` (одна історія `Playground` з Controls і сторінка Docs).

- **Button** (`src/components/Button/Button.tsx`, Storybook: `Components/Button`). Пропси: `variant` (`primary` — заливка `accent`, текст `ink`; `secondary` — без заливки, межа `ink-muted`), `size` (`md`, `lg`), `disabled` (через `aria-disabled`, кнопка лишається у фокусі), `disabledReason` (пояснення під кнопкою, звʼязане через `aria-describedby`), `href` (робить кнопку посиланням `next/link`). Hover: заливка `ink`, текст `canvas`. Фокус: контур `ink`.
- **FormField** (`src/components/FormField/FormField.tsx`, Storybook: `Components/FormField`). Текстове поле з підписом над ним. Пропси: `label`, `type` (`text`, `email`, `tel`, `url`), `defaultValue`, `placeholder`, `error` (межа `danger`, `aria-invalid`), `errorText` (іконка й текст `danger` під полем, звʼязані через `aria-describedby`), `disabled` (атрибут `disabled`, фон і межа `line`), `id`. Межа `ink-muted`, hover і фокус — `ink`. Фон і колір тексту задаються лише в класах станів, щоб не конфліктували.
- **Navigation** (`src/components/Navigation/Navigation.tsx`, Storybook: `Components/Navigation`). Пункти меню з активним станом. Пропси: `items` (`{ label, href }`, за замовчуванням Роботи, Про мене, Контакти), `activeHref` (активний пункт: текст і лінія `accent-ink`, `aria-current="page"`), `label`. Hover пункту — `accent-ink`, фокус — контур `ink`. Нижче `md` згортається в `Button` «Меню»; список відкривається поверх контенту (`absolute`, фон `surface`), закривається Escape, кліком поза меню або вибором пункту.
- **WorkCard** (`src/components/WorkCard/WorkCard.tsx`, Storybook: `Components/WorkCard`). Клікабельна картка кейса. Пропси: `title`, `description`, `href`, `cover` (імпорт із `src/assets`, не з `public`), `coverAlt`. Обкладинка `aspect-cover`, кути `rounded-card`. Hover: назва `accent-ink`, рамка обкладинки `ink`. Фокус: контур `ink` навколо всієї картки.

Картинки компонентів лежать у `src/assets` і імпортуються в код. Після додавання нового файлу компонента перезапусти `npm run storybook`, інакше Storybook може не підхопити його класи.

## Правила

- Усе будується тільки з токенів. Заборонено: hex і rgb у компонентах, стандартні класи Tailwind поза системою (`text-white`, `bg-black`, `text-sm`), значення в квадратних дужках (`p-[13px]`), відступи поза набором.
- Tailwind не повідомляє про невідомий клас, тому після кожної зміни перевіряй, що в коді немає класів, яких немає в `@theme`.
- Змінився `@theme`: онови `Foundations/Tokens` і перезапусти `npm run dev`.
- Компоненти й токени переглядаємо тільки в Storybook (`npm run storybook`), тимчасових сторінок на сайті не створюємо.

## Посилання

- План сайту: [docs/site-plan.md](docs/site-plan.md)
