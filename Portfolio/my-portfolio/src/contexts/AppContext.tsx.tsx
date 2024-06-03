import {
  MutableRefObject,
  ReactNode,
  createContext,
  useRef,
  useState,
} from "react";

type TNavBar = {
  intervalEvent: null | (() => void);
  scrolling: null | boolean;
  scrollSizeY: null;
};

type Scrolling = Pick<TNavBar, "intervalEvent">;

type TUserData = {
  timerCookieRef: MutableRefObject<null>;
  windowSizeTracker: MutableRefObject<null>;
  mousePositionTracker: MutableRefObject<null>;
};

type TTyping = {
  keyboardEvent: null;
  eventInputLostFocus: null;
};

type TFinishedLoading = boolean;

type TPortfolio = {
  navBar: TNavBar;
  scrolling: Scrolling;
};

type TSharedState = {
  portfolio: TPortfolio;
  userData: TUserData;
  typing: TTyping;
  finishedLoading: TFinishedLoading;
};

type ContextProps = {
  sharedState: TSharedState;
  setSharedState?: (value: TSharedState) => void;
};

export const AppContext = createContext<ContextProps>({
  sharedState: {
    portfolio: {
      navBar: {
        intervalEvent: null,
        scrolling: null,
        scrollSizeY: null,
      },
      scrolling: {
        intervalEvent: null,
      },
    },
    userData: {
      timerCookieRef: { current: null },
      windowSizeTracker: { current: null },
      mousePositionTracker: { current: null },
    },
    typing: {
      keyboardEvent: null,
      eventInputLostFocus: null,
    },
    finishedLoading: false,
  },
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const timerCookie = useRef(null);
  const windowSizeTrackerRef = useRef(null);
  const mousePositionRef = useRef(null);

  const [sharedState, setSharedState] = useState<TSharedState>({
    portfolio: {
      navBar: {
        intervalEvent: null,
        scrolling: null,
        scrollSizeY: null,
      },
      scrolling: {
        intervalEvent: null,
      },
    },
    userData: {
      timerCookieRef: timerCookie,
      windowSizeTracker: windowSizeTrackerRef,
      mousePositionTracker: mousePositionRef,
    },
    typing: {
      keyboardEvent: null,
      eventInputLostFocus: null,
    },
    finishedLoading: false,
  });

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
