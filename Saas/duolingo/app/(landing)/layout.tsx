"use client";
import { ReactNode } from "react";
import Header from "./components/Header";
import { Footer } from "./components/Footer";

function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex flex-grow flex-col px-0">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}

export default LandingLayout;
