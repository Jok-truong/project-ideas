import { userActions } from "../reducers/userReducers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logout = () => (dispatch: any) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
};
