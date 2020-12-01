import fetch from "node-fetch";
import { SteamGameDetailsDB } from "./SteamGameDetails";
import { SteamUserInfo } from "./steamGames.interface";
import { addGameToDB } from "./updateSteamGameLibrary";

export const SteamUserSummary = async (steamID: string) => {
  const steamUserInfo = await getSteamUserInfo(steamID);
  const steamUserGames = await getSteamUserGames(steamID);
  //const games = await getSteamUserGamesDetails(steamUserGames.games);
  const steamUserSummary = {
    steamUserInfo: steamUserInfo,
    steamUserGames: steamUserGames,
  };
  return steamUserSummary;
};

const getSteamUserInfo = (steamID: string): Promise<SteamUserInfo> => {
  const host: string = `https://api.steampowered.com`;
  const path: string = `/ISteamUser/GetPlayerSummaries/v2/`;
  const url: string =
    host + path + `?key=${process.env.STEAM_API_KEY}` + `&steamids=${steamID}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((json) => {
      const userInfoFull = json.response.players[0];
      return {
        steamid: userInfoFull.steamid,
        personaname: userInfoFull.personaname,
        profileurl: userInfoFull.profileurl,
        avatar: userInfoFull.avatar,
        avatarmedium: userInfoFull.avatarmedium,
        avatarfull: userInfoFull.avatarfull,
      };
    });
};
const getSteamUserGames = (steamID: string) => {
  const host: string = `https://api.steampowered.com`;
  const path: string = `/IPlayerService/GetOwnedGames/v1/`;
  const url: string =
    host +
    path +
    `?key=${process.env.STEAM_API_KEY}` +
    `&steamid=${steamID}` +
    `&include_appinfo=true` +
    `&include_played_free_games=true`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((json) => {
      const userGames = json.response;
      return {
        game_count: userGames.game_count,
        games: userGames.games.map(
          (game: {
            appid: number;
            name: string;
            playtime_forever: number;
            img_icon_url: string;
            img_logo_url: string;
          }) => {
            return {
              appid: game.appid,
              name: game.name,
              playtime_forever: game.playtime_forever,
              img_icon_url: game.img_icon_url,
              img_logo_url: game.img_logo_url,
            };
          }
        ),
      };
    });
};

const getSteamUserGamesDetails = async (
  games: { appid: number; playtime_forever: number }[]
) => {
  const gamesDetails: {
    appid: number;
    name: string;
    playtime_forever: number;
    image: string;
  }[] = [];

  for (let i = 0; i < games.length; i++) {
    let gameDetails = await SteamGameDetailsDB(games[i]);
    if (!gameDetails) {
      let { status, gameDetails } = await addGameToDB(games[i].appid);
      console.log(`STATUS: ${status}`);
      console.log(`GAME DETAILS: ${JSON.stringify(gameDetails)}`);
      if (status === "added to DB") {
      }
    } else {
      gamesDetails.push({
        ...gameDetails,
        playtime_forever: games[i].playtime_forever,
      });
    }
  }

  //   games.forEach(async (game) => {
  //     let gameDetails = await SteamGameDetailsDB(game);
  //     if (!gameDetails) {
  //       let { status, gameDetails } = await addGameToDB(game.appid);
  //       console.log(`STATUS: ${status}`);
  //       console.log(`GAME DETAILS: ${JSON.stringify(gameDetails)}`);
  //       if (status === "added to DB") {
  //       }
  //     } else {
  //       gamesDetails.push({
  //         ...gameDetails,
  //         playtime_forever: game.playtime_forever,
  //       });
  //     }
  //   });
  return gamesDetails;
};
