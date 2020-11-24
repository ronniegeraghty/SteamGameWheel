import https from "https";
import { UserGameDetails } from "./steamGames.interface";

export const getMultiSteamGameDetails = (
  games: UserGameDetails[]
): Promise<object[]> => {
  return new Promise((resolve, reject) => {
    let gameDetails: Promise<object>[] = [];
    let newGames = games.slice(0, 50);
    console.log(`NEWGAMES_LENGTH: ${newGames.length}`);
    newGames.forEach((game: UserGameDetails) => {
      console.log(`FOREACH\tAPPID: ${game.appid}`);
      gameDetails.push(getSteamGameDetails(game));
    });

    Promise.all(gameDetails).then((details) => {
      console.log(`DETAILS: ${JSON.stringify(details)}`);
      resolve(details);
    });
  });
};

export const getSteamGameDetails = (
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
