import { Router, Request, Response } from "express";
import fetch from "node-fetch";
import Controller from "../../interfaces/controller.interface";

class SteamImages implements Controller {
  public path = "/steam-images";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getImage);
  }

  private getImage = async (request: Request, response: Response) => {
    //`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`
    console.log(`Request Body: ${JSON.stringify(request.body)}`);
    request.body;
    response.send("We Online!");
  };
}
export default SteamImages;
