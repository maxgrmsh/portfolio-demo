import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const description = `
Текстове поле форми з підписом: імʼя, email, телефон у формі «Написати мені».
Підпис завжди стоїть над полем, прямі кути, межа видима.

### Параметри

| Пропс | Значення | За замовчуванням |
|---|---|---|
| \`label\` | текст підпису | обовʼязковий |
| \`type\` | \`text\` · \`email\` · \`tel\` · \`url\` | \`text\` |
| \`defaultValue\` | початкове значення; із ним поле заповнене | немає |
| \`placeholder\` | підказка в порожньому полі | немає |
| \`error\` | \`true\` · \`false\` | \`false\` |
| \`errorText\` | текст помилки під полем | немає |
| \`disabled\` | \`true\` · \`false\` | \`false\` |
| \`id\` | власний id поля | створюється автоматично |

Інші атрибути \`<input>\` (\`name\`, \`required\`, \`autoComplete\`, \`onChange\`) передаються як є.

### Варіанти і стани

- **default**: фон \`surface\`, межа \`ink-muted\` (5,3:1 до \`surface\`, 5:1 до \`canvas\`), підпис \`ink\`, підказка \`ink-muted\`.
- **hover**: межа \`ink\`.
- **focus**: межа \`ink\` і суцільний контур \`ink\` завтовшки 2 з відступом 2 (16,9:1 до \`canvas\`).
- **заповнене**: текст \`ink\` на \`surface\` (17,9:1).
- **помилка**: межа \`danger\`, під полем іконка й текст \`danger\` (6,2:1 до \`canvas\`). Поле отримує \`aria-invalid\`, текст помилки звʼязаний через \`aria-describedby\`. Помилка не тримається лише на кольорі: є іконка й текст.
- **disabled**: фон і межа \`line\`, текст і підпис \`ink-muted\`, курсор «заборонено». Поле не редагується й не потрапляє у фокус. Помилка у вимкненому полі не показується.

### Токени

\`surface\`, \`ink\`, \`ink-muted\`, \`danger\`, \`line\`, \`font-mono\` (підпис), \`font-sans\` (значення, помилка), \`text-caption\`, \`text-body\`, \`rounded-control\`, відступи 2, 3, 4.

### Коли використовувати

- Однорядкові відповіді у формі: імʼя, email, телефон, посилання.
- Помилку показуй після перевірки (втрата фокусу або відправка), текстом пиши, що зробити: «Вкажіть email у форматі name@mail.com».

### Коли не використовувати

- Для довгого тексту (повідомлення): потрібне багаторядкове поле, його ще немає в системі.
- Для вибору з варіантів: потрібні select, радіокнопки або чекбокси.
- Не замінюй підпис підказкою \`placeholder\`: вона зникає під час введення.

### Як брати в код

\`\`\`tsx
import { FormField } from "@/components/FormField/FormField";

<FormField label="Email" type="email" name="email" autoComplete="email" placeholder="name@mail.com" />
<FormField label="Імʼя" name="name" defaultValue="Олексій" />
<FormField label="Email" type="email" name="email" error errorText="Вкажіть email у форматі name@mail.com" />
<FormField label="Компанія" name="company" disabled />
\`\`\`
`;

const meta = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
  },
  argTypes: {
    defaultValue: { control: "text", description: "Значення поля: порожнє — default, з текстом — заповнене" },
    error: { control: "boolean" },
    errorText: { control: "text" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    type: { control: "select", options: ["text", "email", "tel", "url"] },
  },
  args: {
    label: "Email",
    type: "email",
    placeholder: "name@mail.com",
    defaultValue: "",
    error: false,
    errorText: "Вкажіть email у форматі name@mail.com",
    disabled: false,
  },
  // defaultValue is read only on mount: the key remounts the field when it changes in Controls.
  render: (args) => <FormField key={args.defaultValue} {...args} />,
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
