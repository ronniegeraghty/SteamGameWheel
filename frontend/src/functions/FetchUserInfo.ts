import UserInfo from "../interfaces/UserInfo.interface";

export const fetchUserInfo = (
  userName: string
): Promise<UserInfo> | undefined => {
  return fetch(`/api/steam-games/${userName}`).then((response) => {
    if (!response.ok) {
      throw Error(`Caught Error: ${response.statusText}`);
    }
    return response.json();
  });
};
