import "dotenv/config";
import App from "./app";
import db from "./db";
import SampleController from "./routes/sample/sample.controller";
import SteamGames from "./routes/steamGames/steamGames.controller";

const app = new App([new SampleController(), new SteamGames()]);

app.listen();

db.eventManager.on(db.Events.Connected, () =>
  console.log("Successfully connected to Database.")
);
db.eventManager.on(db.Events.Disconnected, () =>
  console.log("Disconnected from DB.")
);

function handleError(err?: Error | NodeJS.Signals | void) {
  if (err) {
    console.error(err);

    if (err instanceof Error) {
      console.error(err.stack);
    }
  }

  db.disconnect({ force: true });
  process.exit(0);
}

process.on("uncaughtException", handleError);
process.on("SIGINT", handleError);
