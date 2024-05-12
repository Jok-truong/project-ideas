import { useContext, useEffect, useState } from "react";
import { AppContext } from "./contexts/AppContext.tsx";
import Header from "./components/Header/index.tsx";
import ThisCantBeReached from "./components/ThisCantBeReached.tsx";
import StarsCanvas from "./components/canvas/StarsCanvas.tsx";
import Startup from "./components/Header/StartupLogo/Startup.tsx";
import MyName from "./components/MyName.tsx";
import SocialMediaAround from "./SocialMediaAround.tsx";
import AboutMe from "./components/AboutMe.tsx";
import WhereIHaveWorked from "./components/WhereIHaveWorked/index.tsx";
import SomethingIveBuilt from "./components/SomethingIveBuilt.tsx";
import GetInTouch from "./components/GetInTouch.tsx";
import ScreenSizeDetector from "./components/ScreenSizeDetector.tsx";

function App() {
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
      {finishedLoading && <StarsCanvas />}
      <div className="z-10">
        {!finishedLoading && showElement && <Startup />}
        <Header finishedLoading={finishedLoading} />
        <MyName finishedLoading={finishedLoading} />
        <SocialMediaAround finishedLoading={finishedLoading} />
        {finishedLoading && <AboutMe finishedLoading={finishedLoading} />}
        {finishedLoading && <WhereIHaveWorked />}
        {finishedLoading && <SomethingIveBuilt />}
        {finishedLoading && <GetInTouch />}
        {finishedLoading && <ScreenSizeDetector />}
      </div>
    </main>
  );
}

export default App;
