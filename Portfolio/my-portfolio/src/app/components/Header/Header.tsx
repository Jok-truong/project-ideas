"use client";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import Logo from "./HeaderComp/Logo";
import IconMenu from "./HeaderComp/IconMenu";
import DesktopMenu from "./HeaderComp/DesktopMenu";
import { AppContext } from "@/app/contexts/AppContext";
import MobileMenu from "./HeaderComp/MobileMenu";

type HeaderProps = {
  finishedLoading: boolean;
};

const Header = ({ finishedLoading }: HeaderProps) => {
  const context = useContext(AppContext);

  const [rotate, setRotate] = useState<boolean>(false);
  const [showElement, setShowElement] = useState(false);

  const refNavBar = useRef<HTMLDivElement>(null);
  const scrollSizeY = useRef<number>(0);

  useEffect(() => {
    if (context.sharedState.portfolio.navBar.intervalEvent == null) {
      context.sharedState.portfolio.navBar.intervalEvent = () => {
        if (scrollSizeY.current == 0) {
          scrollSizeY.current = window.scrollY;
        } else {
          if (window.scrollY > 50) {
            if (window.scrollY > scrollSizeY.current) {
              if (refNavBar) {
                refNavBar.current?.classList.remove("translate-y-0");
                refNavBar.current?.classList.add("-translate-y-full");
              }
            } else {
              refNavBar.current?.classList.add("translate-y-0");
              refNavBar.current?.classList.remove("-translate-y-full");
            }
            scrollSizeY.current = window.scrollY;
          }
        }
      };
    }
  }, [
    context.sharedState.portfolio.navBar,
    context.sharedState.portfolio.navBar.intervalEvent,
  ]);

  useEffect(() => {
    if (context.sharedState.portfolio.navBar.scrolling == null) {
      context.sharedState.portfolio.navBar.scrolling = true;
      scrollSizeY.current = 0;
      if (
        typeof window !== "undefined" &&
        context.sharedState.portfolio.navBar.intervalEvent
      ) {
        window.addEventListener(
          "scroll",
          context.sharedState.portfolio.navBar.intervalEvent
        );
      }
    }
  }, [
    context.sharedState.portfolio.navBar,
    context.sharedState.portfolio.navBar.scrolling,
  ]);

  return (
    <>
      <MobileMenu
        rotate={rotate}
        setRotate={setRotate}
        setShowElement={setShowElement}
        showElement={showElement}
      />

      <motion.div
        ref={refNavBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { delay: finishedLoading ? 0 : 9.4, duration: 0 },
        }}
        className={`w-full fixed ${
          showElement ? `bg-opacity-70 shadow-xl` : `bg-opacity-0 `
        } bg-transparent flex 
      justify-between px-6 sm:px-12 py-2 sm:py-4  transition duration-4000 translate-y-0 z-20`}
      >
        <Logo finishedLoading={finishedLoading} />
        <IconMenu rotate={rotate} setRotate={setRotate} />
        <DesktopMenu finishedLoading={finishedLoading} />
      </motion.div>
    </>
  );
};

export default Header;
