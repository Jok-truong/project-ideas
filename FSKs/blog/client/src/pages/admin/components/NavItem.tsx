import React from "react";
import { NavLink } from "react-router-dom";

type NavItemProp = {
  name?: string;
  link: string;
  title: string;
  icon?: React.ReactNode;
  activeNavName?: string;
  setActiveNavName?: (value: string) => void;
};

const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}: NavItemProp) => {
  return (
    <NavLink
      to={link}
      className={`${
        name === activeNavName
          ? "font-bold text-primary"
          : "font-semibold text-[#A5A5A5]"
      } flex items-center gap-x-2 py-2 text-lg`}
      onClick={() => name && setActiveNavName?.(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default NavItem;
