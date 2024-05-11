import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContextProvider from "./contexts/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Huy Truong - Front-End",
  description:
    "`I've been working on Front-End development for 2 years straight. Get in touch with me to know more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
