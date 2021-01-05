import Controller from "../../interfaces/controller.interface";
import { Request, Response, Router } from "express";
import { getSteamID } from "./getSteamID";
import { SteamUserSummary } from "./SteamUserSummary";

class SteamGames implements Controller {
  public path = "/steam-games";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:username`, this.getUserSummary);
  }

  private getUserSummary = async (request: Request, response: Response) => {
    const userName = request.params.username;
    const steamID = await getSteamID(userName);
    if (!steamID) {
      response.json({ status: "No User Found" });
    } else {
      const steamUserSummary = await SteamUserSummary(steamID);
      response.json({ status: "ok", ...steamUserSummary });
    }
  };
}

export default SteamGames;
