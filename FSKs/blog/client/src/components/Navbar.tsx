import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

interface INavItemInfo {
  name: string;
  type: string;
  href?: string;
  items?: {
    title: string;
    href: string;
  }[];
}

const navItemsInfo: INavItemInfo[] = [
  { name: "Home", type: "link", href: "/" },
  { name: "Blog", type: "link", href: "/blog" },
  { name: "Pricing", type: "link", href: "/pricing" },
  { name: "Faq", type: "link", href: "/faq" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/about" },
      { title: "Contact us", href: "/contact" },
    ],
  },
];

const NavItem = ({ item }: { item: INavItemInfo }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <li className="relative group">
      {item.type === "link" && item.href ? (
        <>
          <Link to={item.href} className="px-4 py-2">
            {item.name}
          </Link>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 flex gap-x-1 items-center"
            onClick={() => setDropdown((prev) => !prev)}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </button>
          <div
            className={`lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max 
            ${dropdown ? "block" : "hidden"}`}
          >
            <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items?.map((page, index) => (
                <Link
                  className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                  key={index}
                  to={page.href}
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Navbar = ({ navIsVisible }: { navIsVisible: boolean }) => {
  return (
    <div
      className={`transition-all duration-300 mt-[56px] lg:mt-0 bg-[##cef2f7] lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center
          ${navIsVisible ? "right-0" : "-right-full"}
          `}
    >
      <ul className="items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
        {React.Children.toArray(
          navItemsInfo.map((item) => <NavItem item={item} />)
        )}
      </ul>
    </div>
  );
};

export default Navbar;
