import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Портфоліо UI-дизайнера",
  description: "Інтерфейси для невеликих SaaS-продуктів",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
