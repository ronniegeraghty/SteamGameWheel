import https from "https";
import SteamUsersGames from "./steamUsersGames.interface";
export const getSteamGames = (steamID: string): Promise<SteamUsersGames> => {
  const host: string = `https://api.steampowered.com`;
  const path: string = `/IPlayerService/GetOwnedGames/v1/`;
  const url: string =
    host + path + `?key=${process.env.STEAM_API_KEY}` + `&steamid=${steamID}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let { statusCode } = response;
        let contentType = response.headers["content-type"];

        let error;

        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
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
            if (parseData.response) {
              resolve({
                gameCount: parseData.response.game_count,
                steamGames: parseData.response.games,
              });
            } else {
              reject(`BAD RESPONSE: ${data}`);
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
