import Link from "next/link";
import SideMenuItem from "./SideMenuItem";

import LogoSVG from "@/public/logo.svg";
import SideMenuThemeButton from "./SideMenuThemeButton";
import SideMenuUserButton from "./SideMenuUserButton";

function Sidebar() {
  return (
    <div className="flex h-full flex-col justify-between pt-6">
      <nav className="flex flex-col gap-6 px-4 sm:max-lg:px-2">
        <Link
          href="/courses"
          className="focus-visible self-start rounded-xl max-sm:ml-4 sm:max-lg:self-center lg:ml-4"
        >
          <span className="hidden sm:max-lg:block">
            <LogoSVG className="w-10 hover:animate-bounce" />
          </span>
          <span className="sm:max-lg:hidden">
            <span className="font-display text-3xl font-bold -tracking-wide text-primary">
              HLingo
            </span>
          </span>
        </Link>
        <ul className="flex flex-col gap-y-2">
          <SideMenuItem href="/learn" icon="learn" label="Learn" />
          <SideMenuItem
            href="/leaderboard"
            icon="leaderboard"
            label="Leaderboard"
          />
          <SideMenuItem href="/quests" icon="quests" label="Quests" />
          <SideMenuItem href="/shop" icon="shop" label="Shop" />
        </ul>
      </nav>
      <div className="space-y-2 border-t-2 px-4 pb-2 pt-2 sm:max-lg:px-2">
        <SideMenuThemeButton />
        <SideMenuUserButton />
      </div>
    </div>
  );
}

export default Sidebar;
