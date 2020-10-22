const SteamUser = require("steam-user");
export interface State {
  client: typeof SteamUser | undefined;
}
export const DefaultState: State = {
  client: undefined,
};
