import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { userInfo: null };

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resetUserInfo(state: any) {
      state.userInfo = null;
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
