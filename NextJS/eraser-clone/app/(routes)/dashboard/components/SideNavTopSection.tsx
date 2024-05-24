"use client";

import { Team } from "@/app/types/Team";
import { User } from "@/app/types/User";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useConvex } from "convex/react";
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Props {
  user: User | null;
  setActiveTeam: (value: Team) => void;
}

const menu = [
  {
    id: 1,
    name: "Create Team",
    path: "/teams/create",
    icon: Users,
  },
  {
    id: 2,
    name: "Settings",
    path: "",
    icon: Settings,
  },
];

function SideNavTopSection({ user, setActiveTeam }: Props) {
  const router = useRouter();
  const convex = useConvex();

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
            <Image src="/logo-1.png" alt="logo" width={40} height={40} />
            <h2 className="flex gap-2 items-center font-bold text-base">
              {} <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
      </Popover>
    </>
  );
}

export default SideNavTopSection;
