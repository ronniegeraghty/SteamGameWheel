import fetch from "node-fetch";
export const getSteamID = async (vanityUserName: string) => {
  const host: string = `https://api.steampowered.com`;
  const path: string = `/ISteamUser/ResolveVanityURL/v0001/`;
  const url: string =
    host +
    path +
    `?key=${process.env.STEAM_API_KEY}` +
    `&vanityurl=${vanityUserName}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `GET STEAM ID API ERROR: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((json) => {
      const steamID = json.response.steamid;
      return steamID;
    });
};
