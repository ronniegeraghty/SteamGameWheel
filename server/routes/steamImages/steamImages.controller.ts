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
    //Steam image upl example
    //`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`
    if (
      request.body.appid &&
      request.body.img_logo_url &&
      typeof request.body.appid === "string" &&
      typeof request.body.img_logo_url === "string"
    ) {
      const { appid, img_logo_url } = request.body;
      const host: string = `http://media.steampowered.com`;
      const path: string = `/steamcommunity/public/images/apps/`;
      const url: string = host + path + appid + "/" + img_logo_url + ".jpg";
      await fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.blob;
        })
        .then((blob) => {
          response.send(blob);
        });
    } else {
      response.send(
        "Request must include an appid:string and img_logo_url:string"
      );
    }
    // console.log(`Request Body: ${JSON.stringify(request.body)}`);
    // request.body;
    // response.send("We Online!");
  };

  private fetchImage = (appid: string, img_logo_url: string) => {};
}

export default SteamImages;
