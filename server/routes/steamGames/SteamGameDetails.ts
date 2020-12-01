import https from "https";
import fetch from "node-fetch";
import db from "../../db";
import { SteamGameLibrary } from "../../entities/SteamGameLibrary";
import { UserGameDetails } from "./steamGames.interface";

export const getSteamGameDetails = (appid: number) => {
  console.log(`APPID: ${appid}`);
  const host: string = `https://store.steampowered.com`;
  const path: string = `/api/appdetails`;
  const url: string = host + path + `?appids=${appid}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((json) => {
      const gameDetails = json;
      if (!gameDetails[appid].success) {
        return {
          success: gameDetails[appid].success,
          gameDetails: gameDetails,
        };
      }
      const gameData = gameDetails[appid].data;
      return {
        success: gameDetails[appid].success,
        gameDetails: {
          appid: gameData.steam_appid,
          name: gameData.name,
          image: gameData.header_image,
        },
      };
    });
};

// export const getMultiSteamGameDetails = (
//   games: UserGameDetails[]
// ): Promise<object[]> => {
//   return new Promise((resolve, reject) => {
//     let gameDetails: Promise<object>[] = [];
//     let newGames = games.slice(0, 50);
//     console.log(`NEWGAMES_LENGTH: ${newGames.length}`);
//     newGames.forEach((game: UserGameDetails) => {
//       console.log(`FOREACH\tAPPID: ${game.appid}`);
//       gameDetails.push(getSteamGameDetails(game));
//     });

//     Promise.all(gameDetails).then((details) => {
//       console.log(`DETAILS: ${JSON.stringify(details)}`);
//       resolve(details);
//     });
//   });
// };

export const SteamGameDetailsDB = async (game: {
  appid: number;
}): Promise<null | {
  appid: number;
  name: string;
  image: string;
}> => {
  const sglRepo = db.connection.getRepository(SteamGameLibrary);
  const gameDetails = await sglRepo.findOne(game.appid);
  if (gameDetails) {
    return {
      appid: gameDetails.appid,
      name: gameDetails.name,
      image: gameDetails.image,
    };
  } else {
    return null;
  }
};

export const getSteamGameDetailsAPI = (
  game: UserGameDetails
): Promise<{
  sent_appid: number;
  playtime: number;
  appid: number;
  name: string;
  image: string;
}> => {
  const host: string = `https://store.steampowered.com`;
  const path: string = `/api/appdetails`;
  const url: string = host + path + `?appids=${game.appid}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let { statusCode } = response;
        let contentType = response.headers["content-type"];

        let error;

        if (statusCode !== 200) {
          error = new Error(
            "Request Failed.\n" + `Status Code: ${statusCode}\n `
          );
        } else if (
          typeof contentType === "string" &&
          !/^application\/json/.test(contentType)
        ) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but recieved ${contentType}`
          );
        }

        if (error) {
          console.error(error.message);
          //consume response data to free up memory
          response.resume();
        }

        response.setEncoding("utf8");
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            const parseData = JSON.parse(data);
            //resolve(parseData);
            if (parseData[game.appid].success) {
              resolve({
                sent_appid: game.appid,
                playtime: game.playtime_forever,
                appid: parseData[game.appid].data.steam_appid,
                name: parseData[game.appid].data.name,
                image: parseData[game.appid].data.header_image,
              });
            }
          } catch (e) {
            reject(e.message);
          }
        });
      })
      .on("error", (e) => {
        reject(`Got error: ${e.message}`);
      });
  });
};
