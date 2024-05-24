import { useContext, useEffect, useState } from "react";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Team } from "@/app/types/Team";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import SideNavTopSection from "./SideNavTopSection";
import { FileListContext } from "@/app/context/FileListContext";

function SideNav() {
  const { setFileList } = useContext(FileListContext);

  const convex = useConvex();
  const createFile = useMutation(api.files.createFile);
  const { user } = useKindeBrowserClient();
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [activeTeam, setActiveTeam] = useState<Team | null>();

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: "2",
    });
    setFileList(result);
    setTotalFiles(result?.length);
  };

  const onFileCreate = (fileName: string) => {
    user?.email &&
      createFile({
        fileName: fileName,
        teamId: "2",
        createdBy: user?.email,
        archive: false,
        document: "",
        whiteboard: "",
      })
        .then((res) => {
          if (res) {
            getFiles();
            toast("File created successfully!");
            console.log(res);
          }
        })
        .catch((e) => {
          toast("Error while creating file");
        });
  };

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  return (
    <div className="h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          activeTeam={activeTeam}
          setActiveTeam={(activeTeam: Team) => setActiveTeam(activeTeam)}
        />
      </div>
      <SideNavBottomSection
        totalFiles={totalFiles}
        onFileCreate={onFileCreate}
      />
    </div>
  );
}

export default SideNav;
