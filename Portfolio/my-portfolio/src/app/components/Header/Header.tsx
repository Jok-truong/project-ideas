"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Logo from "./HeaderComp/Logo";
import IconMenu from "./HeaderComp/IconMenu";
import DesktopMenu from "./HeaderComp/DesktopMenu";

type HeaderProps = {
  finishedLoading: boolean;
};

const Header = ({ finishedLoading }: HeaderProps) => {
  const [rotate, setRotate] = useState<boolean>(false);
  const [showElement, setShowElement] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { delay: finishedLoading ? 0 : 9.4, duration: 0 },
        }}
        className={`w-full fixed ${
          showElement ? `bg-opacity-70 shadow-xl` : `bg-opacity-0 `
        } bg-AAprimary flex 
      justify-between px-6 sm:px-12 py-2 sm:py-4  transition duration-4000 translate-y-0 z-20`}
      >
        {/* Logo A */}
        <Logo finishedLoading={finishedLoading} />
        {/* Hide icon Designed by me */}

        <IconMenu rotate={rotate} setRotate={setRotate} />
        <DesktopMenu finishedLoading={finishedLoading} />
      </motion.div>
    </>
  );
};

export default Header;
