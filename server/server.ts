import "dotenv/config";
import App from "./app";
import SampleController from "./routes/sample/sample.controller";

const app = new App([new SampleController()]);

app.listen();
