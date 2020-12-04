import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import logger from "morgan";
import path from "path";
import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeFrontend();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  public initializeMiddlewares() {
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  public initializeFrontend() {
    this.app.use(express.static(path.resolve(__dirname, "frontend")));
    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile("frontend/index.html", { root: __dirname });
    });
  }

  public initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use("/api", controller.router);
    });
  }
}

export default App;
