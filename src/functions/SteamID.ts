import { STEAM_API_KEY } from "../Config";
export const SteamID = async (vanityUserName: string) => {
  const host: string = `https://api.steampowered.com`;
  const path: string = `/ISteamUser/ResolveVanityURL/v0001/`;
  const url: string =
    host + path + `?key=${STEAM_API_KEY}&vanityurl=${vanityUserName}`;
  console.log(`VANITY USER NAME: ${vanityUserName}`);
  console.log(`STEAM API KEY: ${STEAM_API_KEY}`);
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((json) => {
      const steamID = json;
      return steamID;
    });
};
