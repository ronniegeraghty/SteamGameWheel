import UserInfo from "./UserInfo.interface";
export default interface AppState {
  userInfo: UserInfo | undefined;
}

export const InitAppState: AppState = {
  userInfo: undefined,
};
