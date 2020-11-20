import request from "request";
export const getGames = (userName: string): string[] => {
  let games: string[] = [];
  console.log(`USERNAME: ${userName}`);
  let steamid = "76561198358239082";
  let url1 =
    "https://api.steampowered.com" +
    `/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamid}`;
  let url2 = `https://api.steampowered.com/IPlayerService/GetOwnedGames/' +
  'v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamid}&include_appinfo=true&include_played_free_games=true`;
  let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamid}&format=json`;
  request.get(url, (error, response, body) => {
    console.log(`BODY: ${body}`);
  });
  console.log(`RESPONSE: ${userName}`);
  return games;
};
