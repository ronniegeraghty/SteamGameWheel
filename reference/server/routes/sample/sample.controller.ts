import { response, Router } from "express";
import Controller from "../../interfaces/controller.interface";
import { Request, Response } from "express";

class SampleController implements Controller {
  public path = "/sample";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, (req: Request, res: Response) => {
      res.send("Dingus");
    });
  }
}

export default SampleController;
