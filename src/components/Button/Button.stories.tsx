import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const description = `
Кнопка для дій на сайті: «Написати», «Дивитись роботи», «Розказати про задачу →».
Прямі кути, моноширинний шрифт, текст верхнім регістром.

### Параметри

| Пропс | Значення | За замовчуванням |
|---|---|---|
| \`children\` | текст кнопки (звичайним регістром) | обовʼязковий |
| \`variant\` | \`primary\` · \`secondary\` | \`primary\` |
| \`size\` | \`md\` (звичайний) · \`lg\` (великий) | \`md\` |
| \`disabled\` | \`true\` · \`false\` | \`false\` |
| \`disabledReason\` | пояснення під вимкненою кнопкою | немає |
| \`href\` | адреса, наприклад \`#contact\` або \`/works\` | немає: тоді це \`<button>\` |

Інші атрибути \`<button>\` (\`type\`, \`onClick\`, \`aria-*\`) передаються як є. \`type\` за замовчуванням \`button\`.

### Варіанти

- **primary**: заливка й межа \`accent\`, текст \`ink\` (контраст 5,7:1).
- **secondary**: без заливки, межа \`ink-muted\` (5:1 до \`canvas\`), текст \`ink\` (16,9:1).

### Розміри

- **md**: відступи 4 по горизонталі й 3 по вертикалі.
- **lg**: відступи 6 і 4.

Текст в обох розмірах \`text-caption\`.

### Стани

- **default**: як у варіантах вище.
- **hover**: обидва варіанти стають заливкою \`ink\` з текстом \`canvas\` (16,9:1).
- **focus** (з клавіатури, Tab): суцільний контур \`ink\` завтовшки 2 з відступом 2 від кнопки (16,9:1 до \`canvas\`, 5,7:1 до \`accent\`).
- **disabled**: заливка й межа \`line\`, текст \`ink-muted\`, курсор «заборонено», без реакції на наведення й клік. Реалізовано через \`aria-disabled\`, а не атрибут \`disabled\`: кнопка лишається у фокусі, тож користувач клавіатури її знаходить і чує пояснення. Текст із \`disabledReason\` стоїть під кнопкою (\`ink-muted\`, \`text-caption\`) і звʼязаний з нею через \`aria-describedby\`.

### Токени

\`accent\`, \`ink\`, \`ink-muted\`, \`canvas\`, \`line\`, \`font-mono\`, \`font-sans\` (пояснення), \`text-caption\`, \`rounded-control\`, відступи 2, 3, 4, 6.

Текст на \`accent\` завжди \`ink\`, а не \`canvas\`: світлий текст на акценті має недостатній контраст.

### Коли використовувати

- **primary**: одна головна дія в блоці (hero, заклик до дії, відправка форми).
- **secondary**: другорядна дія поруч із primary, кнопка в шапці.
- **lg**: hero й великий заклик до дії. **md**: усе інше.
- **disabled**: лише разом із \`disabledReason\`, щоб було зрозуміло, що зробити.

### Коли не використовувати

- Для переходу всередині абзацу: там потрібне звичайне посилання.
- Дві primary поруч: друга має бути secondary.
- Для пунктів меню: це посилання, не кнопки.

### Як брати в код

\`\`\`tsx
import { Button } from "@/components/Button/Button";

<Button size="lg" href="#contact">Розказати про задачу →</Button>
<Button variant="secondary" size="lg" href="/works">Дивитись роботи</Button>
<Button variant="secondary" href="#contact">Написати</Button>
<Button type="submit" disabled disabledReason="Заповніть email, щоб надіслати">
  Надіслати
</Button>
\`\`\`
`;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["md", "lg"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
    disabledReason: { control: "text" },
    href: { control: "text" },
  },
  args: {
    children: "Розказати про задачу →",
    variant: "primary",
    size: "md",
    disabled: false,
    disabledReason: "Кнопка стане активною, коли ви заповните форму",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
