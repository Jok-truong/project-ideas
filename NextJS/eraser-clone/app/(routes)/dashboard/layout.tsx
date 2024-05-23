import { ReactNode } from "react";
import SideNav from "./components/SideNav";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grid grid-cols-4">
        <div className="bg-white h-screen w-72 fixed">
          <SideNav />
        </div>
        <div className="col-span-4 ml-72">{children}</div>
      </div>
    </>
  );
}

export default DashboardLayout;
