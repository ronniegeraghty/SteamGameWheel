import { debug } from "console";
import http from "http";
import app from "./App";
import { port } from "./Config";

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error: Error) {
  console.error(`Error: ${error}`);
  console.log(`Error Type ${typeof error}`);
}

function onListening() {
  const addr = server.address();
  if (addr) {
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  } else {
    console.log(`No Address`);
  }
}
