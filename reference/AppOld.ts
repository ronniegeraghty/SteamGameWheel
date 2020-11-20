import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

//Import routes

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "frontend")));

//Add routes

//Send Frontend
app.get("*", (req, res) => {
  res.sendFile("frontend/index.html", { root: __dirname });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

export default app;
