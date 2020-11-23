import https from "https";

export const getSteamGameDetails = (games: object[]): Promise<object> => {
  const host: string = `https://store.steampowered.com`;
  const path: string = `/api/appdetails`;
  const url: string = host + path + `?appids=${games[0].appid}`;

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
            resolve(parseData);
            // if (parseData[appID].success) {
            //   resolve({
            //     appid: parseData[appID].data.steam_appid,
            //     name: parseData[appID].data.name,
            //     image: parseData[appID].data.header_image,
            //   });
            // }
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
