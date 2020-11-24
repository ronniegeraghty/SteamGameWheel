import Controller from "../../interfaces/controller.interface";
import { Request, Response, Router } from "express";
import { getSteamID } from "./getSteamID";
import { getSteamGames } from "././getSteamGames";
import { getSteamUserSummary } from "./getSteamUserSummary";
import {
  getMultiSteamGameDetails,
  getSteamGameDetails,
} from "./getSteamGameDetails";

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
    let games = await getSteamGameDetails(steamGames[0]);
    response.json({
      steamUserSummary: steamUserSummary,
      gameCount: gameCount,
      games: games,
      steamGames: steamGames,
    });
  };
}

export default SteamGames;
