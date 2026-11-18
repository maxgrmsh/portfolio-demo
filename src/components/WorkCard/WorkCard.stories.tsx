import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import cover from "@/assets/work-cover-dashboard.jpg";
import { WorkCard } from "./WorkCard";

const description = `
Картка роботи для сітки кейсів на головній і на сторінці «Роботи»: обкладинка, назва, короткий опис.
Уся картка — одне посилання на сторінку кейса.

### Параметри

| Пропс | Значення | За замовчуванням |
|---|---|---|
| \`title\` | назва роботи або продукту | обовʼязковий |
| \`description\` | один рядок про задачу чи результат | обовʼязковий |
| \`href\` | адреса сторінки кейса | обовʼязковий |
| \`cover\` | картинка, імпортована з \`src/assets\` | обовʼязковий |
| \`coverAlt\` | опис обкладинки; \`""\`, якщо вона декоративна | обовʼязковий |

### Варіанти і стани

- **default**: обкладинка в пропорції \`aspect-cover\` з рамкою \`line\`, назва \`ink\` (\`font-mono\`), опис \`ink-muted\` (\`font-sans\`, 5:1 до \`canvas\`).
- **hover**: назва стає \`accent-ink\` (4,6:1), рамка обкладинки — \`ink\`.
- **focus** (Tab): суцільний контур \`ink\` завтовшки 2 навколо всієї картки з відступом 2 (16,9:1 до \`canvas\`).

Варіантів і розмірів немає: ширину задає сітка, у яку поставлена картка, висота обкладинки виходить із пропорції.

### Токени

\`aspect-cover\`, \`rounded-card\`, \`line\`, \`ink\`, \`ink-muted\`, \`accent-ink\`, \`font-mono\`, \`font-sans\`, \`text-body\`, відступи 2, 3.

### Коли використовувати

- Сітка кейсів (2–3 в рядок на широкому екрані, по одній на вузькому).
- Коли за карткою є окрема сторінка кейса.

### Коли не використовувати

- Якщо сторінки кейса немає: картка без переходу вводить в оману.
- Для відгуків чи послуг: це інші блоки.
- Не клади всередину кнопки чи інші посилання: уся картка вже посилання.

### Як брати в код

\`\`\`tsx
import { WorkCard } from "@/components/WorkCard/WorkCard";
import cover from "@/assets/work-cover-dashboard.jpg";

<ul className="grid gap-6 md:grid-cols-3">
  <li>
    <WorkCard
      href="/works/analytics-dashboard"
      cover={cover}
      coverAlt="Дашборд аналітики з графіком продажів"
      title="Аналітика для SaaS"
      description="Дашборд, який команда відкриває щоранку"
    />
  </li>
</ul>
\`\`\`

Картинки кладемо в \`src/assets\` і імпортуємо: файли з \`public/\` у Storybook не видно.
`;

const meta = {
  title: "Components/WorkCard",
  component: WorkCard,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    href: { control: "text" },
    coverAlt: { control: "text" },
    cover: { control: false },
  },
  args: {
    title: "Аналітика для SaaS",
    description: "Дашборд, який команда відкриває щоранку",
    href: "/works/analytics-dashboard",
    cover,
    coverAlt: "Дашборд аналітики з графіком продажів",
  },
  decorators: [
    // Cards live in a 3-column grid on the site; one column here shows the real width.
    (Story) => (
      <div className="grid gap-6 md:grid-cols-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
