"use client ";

import { FileIData } from "@/app/types/File";
import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Warning from "@editorjs/warning";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

interface Props {
  triggerSave: boolean;
  fileId: string;
  fileData?: FileIData;
}

function Editor({ triggerSave, fileId, fileData }: Props) {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);

  const initEditor = () => {
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a Header",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: Paragraph,
        warning: Warning,
      },

      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : null,
    });
    ref.current = editor;
  };

  const onSaveDocument = () => {
    console.log("@@@");

    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updateDocument({
            _id: fileId as Id<"files">,
            document: JSON.stringify(outputData),
          }).then(
            (resp) => {
              toast("Document Updated!");
            },
            (e) => {
              toast("Server Error!");
            }
          );
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

  useEffect(() => {
    triggerSave && onSaveDocument();
  }, [triggerSave]);

  return <div id="editorjs" className="ml-20"></div>;
}

export default Editor;
