import UserProgress from "@/components/UserProgress";
import MobileSheet from "@/components/mobile/MobileSheet";
import Sidebar from "@/components/sidebar";
import { PropsWithChildren, Suspense } from "react";
import Loading from "./Loading";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-grow flex-col px-0 sm:flex-row">
      <header className="top-0 z-1 max-sm:sticky sm:w-20 lg:w-64">
        <div className="flex items-center justify-between border-b-2 border-primary-depth bg-primary p-2 text-primary-foreground/80 sm:hidden">
          <div className="mx-auto">
            <UserProgress muted />
          </div>
          <MobileSheet>
            <Sidebar />
          </MobileSheet>
        </div>
        <div className="fixed inset-y-0 w-[inherit] border-r-2 max-sm:hidden">
          <Sidebar />
        </div>
      </header>
      <main className="flex flex-1 flex-row gap-6 px-6 pb-24 pt-6 sm:pb-6 lg:gap-12">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
}

export default MainLayout;
