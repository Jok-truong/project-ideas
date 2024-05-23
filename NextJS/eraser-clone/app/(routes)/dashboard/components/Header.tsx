"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";

function Header() {
  const { user, isLoading } = useKindeBrowserClient();
  console.log(user, "user");

  if (isLoading) return <Skeleton />;
  return (
    <div className="flex justify-end w-full gap-2 items-center">
      <div className="flex gap-2 items-center border rounded-md p-1">
        <Search className="h-4 w-4" />
        <input type="text" placeholder="Search" />
      </div>
      <>
        <Image
          src={user?.picture ?? ""}
          alt="user"
          width={30}
          height={30}
          className="rounded-full"
        />
      </>

      <Button>
        <Send className="h-4 w-4 mr-1" /> Invite
      </Button>
    </div>
  );
}

export default Header;
