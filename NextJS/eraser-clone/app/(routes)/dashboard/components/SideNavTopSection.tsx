"use client";

import { Team } from "@/app/types/Team";
import { User } from "@/app/types/User";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

import { useConvex } from "convex/react";
import { ChevronDown, LogOut, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
interface Props {
  user: User | null;
  setActiveTeam: (value: Team) => void;
  activeTeam?: Team | null;
}

const menu = [
  {
    id: 1,
    name: "Create Team",
    path: "/teams/create",
    icon: Users,
  },
];

function SideNavTopSection({ user, setActiveTeam, activeTeam }: Props) {
  const router = useRouter();
  const convex = useConvex();
  const [teamList, setTeamList] = useState<Team[]>();
  console.log(teamList, "teamList");

  const getTeamList = async () => {
    if (user && user.email) {
      const result = await convex.query(api.teams.getTeam, {
        email: user.email,
      });
      console.log("TeamList", result);
      setTeamList(result);
      setActiveTeam(result[0]);
    }
  };

  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  useEffect(() => {
    user && getTeamList();
  }, [user]);

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
        <PopoverContent className="ml-7 p-4">
          {/* Team Section  */}
          <>
            {teamList?.map((team, index) => (
              <h2
                key={index}
                className={`p-2 hover:bg-blue-500
                         hover:text-white
                         rounded-lg mb-1 cursor-pointer
                         ${activeTeam?._id == team._id && "bg-blue-500 text-white"}`}
                onClick={() => setActiveTeam(team)}
              >
                {team.teamName}
              </h2>
            ))}
          </>
          <Separator className="mt-2 bg-slate-100" />
          {/* Option Section  */}
          <>
            {menu.map((item, index) => (
              <h2
                key={index}
                className="flex gap-2 items-center
                        p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                onClick={() => onMenuClick(item)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2
                className="flex gap-2 items-center
                        p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </h2>
            </LogoutLink>
          </>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SideNavTopSection;
