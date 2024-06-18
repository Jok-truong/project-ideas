"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { isLoading } = useKindeBrowserClient();

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Header />
          <Hero />
        </>
      )}
    </>
  );
}
