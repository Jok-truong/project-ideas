import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { sharedMetadata } from "@/config/metadata";
import { fonts } from "@/config/fonts";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ExitModal from "@/components/modals/useExitModal";
import { HeartsModal } from "@/components/modals/useHeartsModal";
import { Suspense } from "react";
import Loading from "@/components/loading";

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
    <ClerkProvider
      appearance={{
        variables: {
          fontSize: "0.875rem",
          borderRadius: "0.5rem",
          colorPrimary: "hsl(142, 71%, 45%)",
        },
      }}
    >
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className={`${fonts} flex flex-col font-sans`}
        >
          <Toaster theme="light" richColors closeButton />
          <ExitModal />
          <HeartsModal />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
