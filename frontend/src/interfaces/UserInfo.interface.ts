import GameInfo from "./GameInfo.interface";

export default interface UserInfo {
  status: string;
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  game_count: number;
  games: GameInfo[];
}
