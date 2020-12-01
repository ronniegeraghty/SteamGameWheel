export interface SteamUsersGames {
  gameCount: number;
  steamGames: UserGameDetails[];
}

export interface UserGameDetails {
  appid: number;
  playtime_forever: number;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
}

export interface SteamGameDetails {
  appid: number;
  name: string;
  image: string;
}

export interface SteamUserInfo {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
}
