import { FileIData } from "@/app/types/File";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";

interface Props {
  triggerSave: boolean;
  fileId: string;
  fileData?: FileIData;
}
function Canvas({ fileId, triggerSave, fileData }: Props) {
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  const [whiteBoardData, setWhiteBoardData] =
    useState<Readonly<ExcalidrawElement[]>>();

  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId as Id<"files">,
      whiteboard: JSON.stringify(whiteBoardData),
    }).then((resp) => console.log(resp));
  };

  useEffect(() => {
    triggerSave && saveWhiteboard();
  }, [triggerSave]);

  return (
    <div style={{ height: "670px" }}>
      {fileData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas;
