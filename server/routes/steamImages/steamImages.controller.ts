import { Router, Request, Response } from "express";
import fetch from "node-fetch";
import request from "request";
import Controller from "../../interfaces/controller.interface";

class SteamImages implements Controller {
  public path = "/steam-images";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:appid/:img_logo_url`, this.getImage);
  }

  private getImage = async (req: Request, res: Response) => {
    //Steam image upl example
    //`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`
    if (
      req.params.appid &&
      req.params.img_logo_url &&
      typeof req.params.appid === "string" &&
      typeof req.params.img_logo_url === "string"
    ) {
      const { appid, img_logo_url } = req.params;
      const host: string = `http://media.steampowered.com`;
      const path: string = `/steamcommunity/public/images/apps/`;
      const url: string = host + path + appid + "/" + img_logo_url + ".jpg";
      request.get(url).pipe(res);
    } else {
      res.send("Request must include an appid:string and img_logo_url:string");
    }
  };
}

export default SteamImages;
