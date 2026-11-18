import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/nextjs-vite",
  // staticDirs: ['../public'] removed on purpose: Storybook builds into
  // public/storybook, and that line breaks the build (ERR_FS_CP_EINVAL).
  // Component images live in src/assets and are imported.
  // The published build lives at <site>/storybook (see next.config.ts rewrite).
  // A <base> makes its relative files resolve under /storybook/ even when the
  // URL has no trailing slash. Only for the build: `npm run storybook` stays at /.
  managerHead: (head, { configType }) =>
    configType === "PRODUCTION" ? `<base href="/storybook/" />\n${head ?? ""}` : head ?? "",
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    return config;
  },
};

export default config;
