import { FileListContext } from "@/app/context/FileListContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Archive, MoreHorizontal } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
export interface FileItem {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

function FileList() {
  const router = useRouter();

  const { fileList, setFileList } = useContext(FileListContext);
  const { user } = useKindeBrowserClient();
  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                File Name
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created At
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Edited
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList &&
              fileList.map((file: FileItem) => (
                <tr
                  key={file._id}
                  className="odd:bg-gray-50 cursor-pointer"
                  onClick={() => router.push("")}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user && (
                      <Image
                        src={user?.picture ?? ""}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuItem className="gap-3">
                          <Archive className="h-4 w-4" /> Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
