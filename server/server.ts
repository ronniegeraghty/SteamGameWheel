import "dotenv/config";
import App from "./app";
import SampleController from "./routes/sample/sample.controller";
import SteamGames from "./routes/steamGames/steamGames.controller";
import Version from "./routes/version/version.controller";

const app = new App([new SampleController(), new SteamGames(), new Version()]);

app.listen();
