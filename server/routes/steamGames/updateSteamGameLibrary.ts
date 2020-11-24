import { getRepository } from "typeorm";
import { SteamGameLibrary } from "../../entities/SteamGameLibrary";
import { SteamGameDetails } from "./steamGames.interface";
import db from "../../db";

export const updateSteamGameLibrary = async (game: SteamGameDetails) => {
  const sglRepo = db.connection.getRepository(SteamGameLibrary);
  const newSteamGame = new SteamGameLibrary();
  newSteamGame.appid = game.appid;
  newSteamGame.name = game.name;
  newSteamGame.image = game.image;
  await sglRepo.save(newSteamGame);
};
