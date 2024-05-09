"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./contexts/AppContext";
import ThisCantBeReached from "./Home/ThisCantBeReached";
import Header from "./components/Header/Header";
import Startup from "./components/Header/StartupLogo/Startup";

export default function Home() {
  const context = useContext(AppContext);

  const [showElement, setShowElement] = useState(false);
  const [ShowThisCantBeReached, setShowThisCantBeReached] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowElement(true);
    }, 4500);

    setTimeout(() => {
      setShowThisCantBeReached(false);
    }, 5400);

    setTimeout(() => {
      setShowElement(false);
      context.sharedState.finishedLoading = true;
      context?.setSharedState?.(context.sharedState);
    }, 10400);
  }, [context, context.sharedState]);

  console.log(context, "context");

  return (
    <main className="relative snap-y snap-mandatory min-h-screen bg-AAprimary w-full">
      {context.sharedState.finishedLoading ? (
        <></>
      ) : ShowThisCantBeReached ? (
        <ThisCantBeReached />
      ) : (
        <></>
      )}
      {context.sharedState.finishedLoading ? (
        <></>
      ) : showElement ? (
        <Startup />
      ) : (
        <></>
      )}

      <Header finishedLoading={context.sharedState.finishedLoading} />
    </main>
  );
}
