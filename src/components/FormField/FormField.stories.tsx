import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const description = `
Поле форми з підписом: імʼя, email, телефон і повідомлення у формі заявки.
Буває однорядкове (\`<input>\`) і багаторядкове (\`multiline\`, \`<textarea>\`).
Підпис завжди стоїть над полем, прямі кути, межа видима.

### Параметри

| Пропс | Значення | За замовчуванням |
|---|---|---|
| \`label\` | текст підпису | обовʼязковий |
| \`multiline\` | \`true\` (\`<textarea>\`) · \`false\` (\`<input>\`) | \`false\` |
| \`rows\` | висота багаторядкового поля в рядках | \`5\` |
| \`type\` | \`text\` · \`email\` · \`tel\` · \`url\` (лише однорядкове) | \`text\` |
| \`defaultValue\` | початкове значення; із ним поле заповнене | немає |
| \`placeholder\` | підказка в порожньому полі | немає |
| \`autoComplete\` | підказка автозаповнення: \`name\`, \`email\`, \`tel\`, \`url\`, \`organization\`, \`off\` | немає |
| \`hint\` | підказка під полем (\`ink-muted\`), наприклад ліміт символів; поки є помилка, замість неї текст помилки | немає |
| \`error\` | \`true\` · \`false\` | \`false\` |
| \`errorText\` | текст помилки під полем | немає |
| \`disabled\` | \`true\` · \`false\` | \`false\` |
| \`id\` | власний id поля; на нього посилається зведення помилок, текст помилки отримує id \`<id>-error\`, підказка — \`<id>-hint\` | створюється автоматично |

Інші атрибути \`<input>\` або \`<textarea>\` (\`name\`, \`required\`, \`maxLength\`, \`onChange\`) передаються як є.

### Варіанти і стани

- **default**: фон \`surface\`, межа \`ink-muted\` (5,3:1 до \`surface\`, 5:1 до \`canvas\`), підпис \`ink\`, підказка \`ink-muted\`.
- **hover**: межа \`ink\`.
- **focus**: межа \`ink\` і суцільний контур \`ink\` завтовшки 2 з відступом 2 (16,9:1 до \`canvas\`).
- **заповнене**: текст \`ink\` на \`surface\` (17,9:1).
- **помилка**: межа \`danger\`, під полем іконка й текст \`danger\` (6,2:1 до \`canvas\`). Поле отримує \`aria-invalid\`, текст помилки звʼязаний через \`aria-describedby\`. Помилка не тримається лише на кольорі: є іконка й текст. Перед текстом стоїть візуально прихований префікс «Помилка:» (клас \`sr-only\`): скрінрідер читає «Помилка: Вкажіть email…», на екрані його не видно.
- **багаторядкове**: ті самі межі, фон і стани; висота задається \`rows\`, користувач може тягнути поле лише по вертикалі.
- **disabled**: фон і межа \`line\`, текст і підпис \`ink-muted\`, курсор «заборонено». Поле не редагується й не потрапляє у фокус. Помилка у вимкненому полі не показується.

### Токени

\`surface\`, \`ink\`, \`ink-muted\`, \`danger\`, \`line\`, \`font-mono\` (підпис), \`font-sans\` (значення, помилка), \`text-caption\`, \`text-body\`, \`rounded-control\`, відступи 2, 3, 4.

### Коли використовувати

- Однорядкові відповіді у формі: імʼя, email, телефон, посилання.
- Повідомлення, опис задачі: \`multiline\`.
- Зведення помилок над формою: дай полю \`id\` і посилайся на нього \`<a href="#contact-email">\`.
- Помилку показуй після перевірки (втрата фокусу або відправка), текстом пиши, що зробити: «Вкажіть email у форматі name@mail.com».

### Коли не використовувати

- Для вибору з варіантів: потрібні select, радіокнопки або чекбокси.
- Не замінюй підпис підказкою \`placeholder\`: вона зникає під час введення.

### Як брати в код

\`\`\`tsx
import { FormField } from "@/components/FormField/FormField";

<FormField label="Email" type="email" name="email" autoComplete="email" placeholder="name@mail.com" />
<FormField label="Імʼя" name="name" autoComplete="name" defaultValue="Олексій" />
<FormField label="Повідомлення" name="message" multiline rows={6} hint="до 1000 символів" />
<FormField id="contact-email" label="Email" type="email" name="email" autoComplete="email" />
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
    multiline: { control: "boolean", description: "Багаторядкове поле (textarea) для повідомлення" },
    rows: { control: { type: "number", min: 2, max: 12, step: 1 }, if: { arg: "multiline" } },
    autoComplete: {
      control: "select",
      options: ["off", "name", "email", "tel", "url", "organization"],
    },
    id: { control: "text", description: "Власний id; порожній — створюється автоматично" },
    defaultValue: { control: "text", description: "Значення поля: порожнє — default, з текстом — заповнене" },
    error: { control: "boolean" },
    errorText: { control: "text" },
    hint: { control: "text", description: "Підказка під полем; поки є помилка, її замінює текст помилки" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "tel", "url"],
      if: { arg: "multiline", truthy: false },
    },
  },
  args: {
    label: "Email",
    type: "email",
    multiline: false,
    rows: 5,
    autoComplete: "email",
    id: "contact-email",
    placeholder: "name@mail.com",
    defaultValue: "",
    error: false,
    errorText: "Вкажіть email у форматі name@mail.com",
    hint: "",
    disabled: false,
  },
  // defaultValue is read only on mount: the key remounts the field when it or the element changes.
  render: (args) => (
    <FormField key={`${args.multiline ? "textarea" : "input"}-${args.defaultValue}`} {...args} />
  ),
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
