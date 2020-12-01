import Controller from "../../interfaces/controller.interface";
import { Request, Response, Router } from "express";
import { getSteamID } from "./getSteamID";
import { SteamUserSummary } from "./SteamUserSummary";
import { updateSteamGameLibrary } from "./updateSteamGameLibrary";

class SteamGames implements Controller {
  public path = "/steam-games";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .get(`${this.path}/:username`, this.getUserGames)
      .get(`${this.path}`, this.getAllGames);
  }

  private getUserGames = async (request: Request, response: Response) => {
    const userName = request.params.username;
    const steamID = await getSteamID(userName);
    const steamUserSummary = await SteamUserSummary(steamID);
    response.json(steamUserSummary);
  };

  private getAllGames = async (request: Request, response: Response) => {
    const status = await updateSteamGameLibrary();
    response.json(status);
  };
}

export default SteamGames;
