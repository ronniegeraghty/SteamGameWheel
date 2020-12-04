import { SteamGameLibrary } from "../../entities/SteamGameLibrary";
import { SteamGameDetails } from "./steamGames.interface";
import db from "../../db";
import fetch from "node-fetch";
import { getSteamGameDetails } from "./SteamGameDetails";

export const updateSteamGameLibrary = async () => {
  const allSteamGames: any[] = (await getAllSteamGames()).applist.apps;
  const gamesInDBArr = await db.connection
    .getRepository(SteamGameLibrary)
    .find();
  const gamesInDB: { [key: string]: any } = {};
  gamesInDBArr.forEach(
    (game: { appid: Number; name: string; image: string }) => {
      let appidString: string = game.appid.toString();
      gamesInDB[appidString] = {
        appid: game.appid,
        name: game.name,
        image: game.image,
      };
    }
  );

  const gamesAddedToDB: any[] = [];

  // allSteamGames.forEach(async (game: { appid: number; name: string }) => {
  //   console.log(`GAME: ${game.name}\nAppID: ${game.appid}`);
  //   if (gamesInDB[game.appid.toString()]) {
  //     console.log(`GAME IN DB\n`);
  //   } else {
  //     console.log(`GAME NOT IN DB`);
  //     gamesAddedToDB.push(await addGameToDB(game.appid));
  //     console.log(`\n\n`);
  //   }
  // });

  for (let i = 0; i < 450; i++) {
    if (gamesInDB[allSteamGames[i].appid.toString()]) {
      //console.log(`GAME IN DB\n`);
    } else {
      console.log(`GAME NOT IN DB`);
      gamesAddedToDB.push(await addGameToDB(allSteamGames[i].appid));
      console.log(`\n\n`);
    }
  }

  return {
    gamesAddedToDB: gamesAddedToDB,
    gamesInDB: gamesInDB,
    allSteamGames: allSteamGames,
  };
};

export const updateSteamGameLibraryOLD = async (game: SteamGameDetails) => {
  const sglRepo = db.connection.getRepository(SteamGameLibrary);
  const newSteamGame = new SteamGameLibrary();
  newSteamGame.appid = game.appid;
  newSteamGame.name = game.name;
  newSteamGame.image = game.image;
  await sglRepo.save(newSteamGame);
};

const getAllSteamGames = () => {
  const host: string = `https://api.steampowered.com/`;
  const path: string = `/ISteamApps/GetAppList/v2/`;
  const url: string = host + path;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const addGameToDB = async (
  appid: number
): Promise<{ status: string; gameDetails: object }> => {
  try {
    const { success, gameDetails } = await getSteamGameDetails(appid);
    console.log(`GAMEDETAILS: ${JSON.stringify(gameDetails)}`);
    if (success) {
      const sglRepo = db.connection.getRepository(SteamGameLibrary);
      const newSteamGame = new SteamGameLibrary();
      newSteamGame.appid = gameDetails.appid;
      newSteamGame.name = gameDetails.name;
      newSteamGame.image = gameDetails.image;
      const result = await sglRepo.save(newSteamGame);
      return { status: "added to DB", gameDetails: result };
    }
    return { status: "no result from game details.", gameDetails: gameDetails };
  } catch (error) {
    console.log(`API ERROR: ${error.message}`);
    if (error.message === "Too Many Requests") {
      console.log(`Start Waiting`);
      let recursiveOutput: Promise<{
        status: string;
        gameDetails: object;
      }> = new Promise((resolve) => {
        setTimeout(async () => {
          console.log(`Done Waiting`);
          resolve(await addGameToDB(appid));
        }, 180000);
      });
      return await recursiveOutput;
    }
    return { status: "error on api call", gameDetails: error.message };
  }
};
