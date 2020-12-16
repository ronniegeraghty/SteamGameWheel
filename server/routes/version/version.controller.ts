import { Router, Request, Response } from "express";
import Controller from "../../interfaces/controller.interface";
import npmPackage from "../../../package.json";

class Version implements Controller {
  public path = "/version";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(this.path, this.getVersion);
  }
  private getVersion = (req: Request, res: Response) => {
    res.json({ version: npmPackage.version });
  };
}
export default Version;
