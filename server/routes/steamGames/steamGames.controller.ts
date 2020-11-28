import Controller from "../../interfaces/controller.interface";
import { Request, Response, Router } from "express";
import { getSteamID } from "./getSteamID";
import { getSteamGames } from "././getSteamGames";
import { getSteamUserSummary } from "./getSteamUserSummary";
import {
  getSteamGameDetailsAPI,
  getSteamGameDetailsDB,
} from "./getSteamGameDetails";
import { updateSteamGameLibrary } from "./updateSteamGameLibrary";

class SteamGames implements Controller {
  public path = "/steam-games";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:username`, this.getUserGames);
  }

  private getUserGames = async (request: Request, response: Response) => {
    const userName = request.params.username;
    const steamID = await getSteamID(userName);
    const steamUserSummary = await getSteamUserSummary(steamID);
    const { gameCount, steamGames } = await getSteamGames(steamID);
    let games = await getSteamGameDetailsDB(steamGames[10]);
    if (!games) {
      games = await getSteamGameDetailsAPI(steamGames[10]);
      updateSteamGameLibrary({
        appid: games.appid,
        name: games.name,
        image: games.image,
      });
    }

    response.json({
      steamUserSummary: steamUserSummary,
      gameCount: gameCount,
      games: games,
      steamGames: steamGames,
    });
  };
}

export default SteamGames;
