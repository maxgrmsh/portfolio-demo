import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

// Docs/MDX pages (e.g. Foundations/Tokens) are not wrapped by decorators,
// so the font variable classes also go on <html>, like in the site layout.
document.documentElement.classList.add(...fontVariables.split(" "));

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // next/font exposes font variables as classes on <html> in the site
    // layout; Storybook has no layout, so stories get the same classes here.
    (Story) => (
      <div className={`${fontVariables} font-sans text-body text-ink`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
