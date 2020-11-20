import Controller from "../../interfaces/controller.interface";
import { Request, Response, Router } from "express";
import { getGames } from "./getGames";

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
    const games = getGames(userName);
    response.json({ games: games, userName: userName });
  };
}

export default SteamGames;
