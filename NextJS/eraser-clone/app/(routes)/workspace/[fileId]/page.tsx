"use client";

import { useEffect, useState } from "react";
import WorkspaceHeader from "../components/WorkspaceHeader";
import Editor from "../components/Editor";
import { useConvex } from "convex/react";
import { FileIData } from "@/app/types/File";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Canvas from "../components/Canvas";

interface Props {
  params: { fileId: string };
}

function Workspace({ params }: Props) {
  const convex = useConvex();
  const [triggerSave, setTriggerSave] = useState(false);
  const [fileData, setFileData] = useState<FileIData>();

  const getFileData = async () => {
    if (params.fileId) {
      const result = await convex.query(api.files.getFileById, {
        _id: params.fileId as Id<"files">,
      });
      setFileData(result);
    }
  };

  useEffect(() => {
    params.fileId && getFileData();
  }, []);

  return (
    <>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      <div
        className="grid grid-cols-1
      md:grid-cols-2"
      >
        {/* Document  */}
        <div className=" h-screen">
          <Editor
            triggerSave={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
        {/* Whiteboard/canvas  */}
        <div className=" h-screen border-l">
          <Canvas
            triggerSave={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </>
  );
}

export default Workspace;
