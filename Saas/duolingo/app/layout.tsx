import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { sharedMetadata } from "@/config/metadata";
import { fonts } from "@/config/fonts";

import "./globals.css";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: {
    template: "%s | HLingo App",
    default: "HLingo App - Unlock a new language.",
  },
  description:
    "Master a new language with the HLingo app - the fun and easy way to speak like a local!",
  keywords: ["Duolingo", "Language", "Learn Languages"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts} flex flex-col font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
