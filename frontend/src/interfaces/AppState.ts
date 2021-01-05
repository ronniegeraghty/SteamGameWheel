import UserInfo from "./UserInfo.interface";
export default interface AppState {
  userInfo: UserInfo | undefined;
  foundSteamUser: boolean;
}

export const InitAppState: AppState = {
  userInfo: undefined,
  foundSteamUser: true,
};
