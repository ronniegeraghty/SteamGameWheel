import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { port } from "./Config";

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "frontend")));

// define a route handler for the default home page
app.get("/api", (req, res) => {
  res.send("Dingus Mingus");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/" + "index.html"));
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
