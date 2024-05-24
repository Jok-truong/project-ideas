"use client";

import { ReactNode, useState } from "react";
import SideNav from "./components/SideNav";
import { FileListContext } from "@/app/context/FileListContext";

function DashboardLayout({ children }: { children: ReactNode }) {
  const [fileList, setFileList] = useState();

  return (
    <>
      <FileListContext.Provider value={{ fileList, setFileList }}>
        <div className="grid grid-cols-4">
          <div className="bg-white h-screen w-72 fixed">
            <SideNav />
          </div>
          <div className="col-span-4 ml-72">{children}</div>
        </div>
      </FileListContext.Provider>
    </>
  );
}

export default DashboardLayout;
