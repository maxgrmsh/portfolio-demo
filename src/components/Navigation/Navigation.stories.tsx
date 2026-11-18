import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navigation } from "./Navigation";

const description = `
Навігація сайту: пункти меню «Роботи · Про мене · Контакти» з підсвіченим активним пунктом.
На широкому екрані це рядок посилань, на вузькому — кнопка «Меню», яка відкриває список поверх сторінки.

Вузький екран дивись через кнопку **Viewport** у верхній панелі Storybook (іконка монітора), наприклад Small mobile. Під меню в історії стоїть зразок тексту: відкрите меню має перекривати його, а не зсувати вниз.

### Параметри

| Пропс | Значення | За замовчуванням |
|---|---|---|
| \`items\` | масив \`{ label, href }\` | Роботи \`/works\`, Про мене \`/about\`, Контакти \`/contact\` |
| \`activeHref\` | \`href\` поточної сторінки | немає: активного пункту немає |
| \`label\` | назва меню для скрінрідерів | «Головне меню» |

### Варіанти і стани

**Пункт меню** (моноширинний шрифт, верхній регістр, \`text-caption\`):

- **default**: текст \`ink\`, без підкреслення.
- **hover**: текст \`accent-ink\` (4,6:1 до \`canvas\`).
- **focus** (Tab): суцільний контур \`ink\` завтовшки 2 з відступом 2 (16,9:1 до \`canvas\`).
- **активний**: текст \`accent-ink\` і лінія \`accent-ink\` під пунктом (4,6:1); посилання має \`aria-current="page"\`. Активний пункт відрізняється не лише кольором, а й лінією.

**Вузький екран** (менше \`md\`):

- Кнопка \`Button\` варіанту \`secondary\` з текстом «Меню» / «Закрити», з \`aria-expanded\` і \`aria-controls\`.
- Відкритий список лежить поверх контенту (\`absolute\`), фон \`surface\`, рамка \`line\`, кути \`rounded-card\`.
- Закривається: клавішею **Escape** (фокус повертається на кнопку), кліком поза меню, вибором пункту, повторним натисканням кнопки.

### Токени

\`ink\`, \`accent-ink\`, \`surface\`, \`line\`, \`font-mono\`, \`text-caption\`, \`rounded-card\`, відступи 2, 4, 6, 8. Кнопка використовує токени \`Button\`.

### Коли використовувати

- Одна навігація в шапці кожної сторінки.
- \`activeHref\` передавай завжди, коли сторінка є в меню: так людина бачить, де вона.

### Коли не використовувати

- Для дій («Написати»): поруч став \`Button\`, а не пункт меню.
- Для меню з підрівнями: цей компонент їх не підтримує.
- Не більше 5–6 пунктів: інакше рядок не вміщується на планшеті.

### Як брати в код

\`\`\`tsx
import { Navigation } from "@/components/Navigation/Navigation";

// у шапці сторінки «Роботи»
<Navigation activeHref="/works" />

// власні пункти
<Navigation
  items={[
    { label: "Роботи", href: "/works" },
    { label: "Контакти", href: "#contact" },
  ]}
/>
\`\`\`
`;

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    activeHref: {
      name: "Активний пункт (activeHref)",
      control: { type: "select", labels: { "": "немає", "/works": "Роботи", "/about": "Про мене", "/contact": "Контакти" } },
      options: ["", "/works", "/about", "/contact"],
    },
    items: { control: false },
    label: { control: "text" },
  },
  args: {
    activeHref: "/works",
    label: "Головне меню",
  },
  decorators: [
    // A header-like row with sample content below, to show the open
    // mobile menu overlays the page instead of pushing it down.
    (Story) => (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-body">maxharmash</span>
          <Story />
        </div>
        <p className="font-sans text-body text-ink-muted">
          Зразок контенту під шапкою. Відкрите меню на вузькому екрані має лягти поверх цього тексту.
        </p>
      </div>
    ),
  ],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
