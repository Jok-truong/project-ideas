import React from "react";

const Layout = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) => {
  return (
    <div
      id={id}
      className={`${className} flex justify-center
      px-8`}
    >
      {children}
    </div>
  );
};

export default Layout;
