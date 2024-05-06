import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducers.ts";
import { TUserState } from "../types/user.ts";

const userInfoFromStorage = () => {
  const storedData = localStorage.getItem("account");
  if (storedData === null) {
    return null;
  }
  return JSON.parse(storedData);
};

const initialState: TUserState = {
  user: { userInfo: userInfoFromStorage() },
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: initialState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
