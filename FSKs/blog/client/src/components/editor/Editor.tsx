import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import MenuBar from "./MenuBar";

type EditorProps = {
  onDataChange: any;
  content: any;
  editable: boolean;
};

const Editor = ({ onDataChange, content, editable }: EditorProps) => {
  const editor = useEditor({
    editable,
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      Code,
    ],
    editorProps: {
      attributes: {
        class:
          "!prose !dark:prose-invert prose-sm sm:prose-base max-w-none mt-7 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  return (
    <div className="w-full relative">
      {editable && <MenuBar editor={editor} />}
      <EditorContent
        className="p-5 pt-0 border rounded-lg my-5"
        editor={editor}
      />
    </div>
  );
};

export default Editor;
