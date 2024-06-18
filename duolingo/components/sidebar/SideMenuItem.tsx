"use client";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  icon: string;
  href: Route;
  hideLabel?: boolean;
};

function SideMenuItem({ href, icon, label, hideLabel }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Button
        variant={isActive ? "active" : "ghost"}
        className={`h-auto w-full justify-start py-2 sm:max-lg:w-auto sm:max-lg:px-2 ${
          isActive ? "border-b-2" : ""
        }`}
        asChild
      >
        <Link
          href={href}
          title={label}
          {...(hideLabel && { "aria-label": label })}
        >
          <span className="relative block size-10">
            <Image
              className="object-cover"
              src={`/img/icons/${icon}.svg`}
              alt={`${label} icon`}
              fill
            />
          </span>
          {!hideLabel && (
            <span className="ml-5 truncate sm:max-lg:sr-only">{label}</span>
          )}
        </Link>
      </Button>
    </li>
  );
}

export default SideMenuItem;
