import { State } from "../types/State";
require("dotenv").config({ path: __dirname + "/.env" });
console.log(process.env.STEAM_KEY);
const SteamAPI = require("steamapi");
const steam = new SteamAPI(process.env.STEAM_KEY);

export { Login };
const Login = async (username: string, password: string): Promise<State> => {
  steam.resolve(username).then((id: string) => {
    console.log(id);
  });

  return {};
};
