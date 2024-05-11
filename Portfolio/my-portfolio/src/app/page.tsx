"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./contexts/AppContext";
import ThisCantBeReached from "./components/Home/ThisCantBeReached";
import Header from "./components/Header/Header";
import Startup from "./components/Header/StartupLogo/Startup";
import MyName from "./components/Home/MyName";
import SocialMediaAround from "./components/Home/SocialMediaAround";
import AboutMe from "./components/Home/AboutMe";
import WhereIHaveWorked from "./components/Home/WhereIHaveWorked/WhereIHaveWorked";
import SomethingIveBuilt from "./components/Home/SomethingIveBuiltPage";
import GetInTouch from "./components/Home/GetInTouch";
import StartCanvas from "./components/Canvas/StartCanvas";
import ScreenSizeDetector from "./components/ScreenSizeDetector";

export default function Home() {
  const context = useContext(AppContext);

  const [showElement, setShowElement] = useState(false);
  const [showThisCantBeReached, setShowThisCantBeReached] = useState(true);

  const { finishedLoading } = context.sharedState;

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

  return (
    <main
      className={`relative snap-y snap-mandatory min-h-screen ${
        finishedLoading ? "bg-transparent" : "bg-AAprimary"
      } w-full`}
    >
      {showThisCantBeReached && <ThisCantBeReached />}
      {finishedLoading && <StartCanvas />}
      <div className="z-10">
        {!finishedLoading && showElement && <Startup />}
        <Header finishedLoading={finishedLoading} />
        <MyName finishedLoading={finishedLoading} />
        <SocialMediaAround finishedLoading={finishedLoading} />
        {finishedLoading && <AboutMe />}
        {finishedLoading && <WhereIHaveWorked />}
        {finishedLoading && <SomethingIveBuilt />}
        {finishedLoading && <GetInTouch />}
        <ScreenSizeDetector />
      </div>
    </main>
  );
}
