import { Caveat, Geologica, Martian_Mono } from "next/font/google";

// Shared by the site layout and Storybook (.storybook/preview.tsx).
// Cyrillic subset is required: by default next/font loads Latin only,
// and Ukrainian text silently falls back to a system font.

const geologica = Geologica({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-geologica",
});

const martianMono = Martian_Mono({
  weight: ["500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-martian-mono",
});

const caveat = Caveat({
  weight: "700",
  subsets: ["latin", "cyrillic"],
  variable: "--font-caveat",
});

/** Class names that expose the font CSS variables used by @theme. */
export const fontVariables = [
  geologica.variable,
  martianMono.variable,
  caveat.variable,
].join(" ");
