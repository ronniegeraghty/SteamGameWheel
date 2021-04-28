import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { fetchUserInfo } from "../functions/FetchUserInfo";
import { shuffle } from "../functions/ShuffleArray";
import UserInfo from "../interfaces/UserInfo.interface";

interface UserContextInterface {
  user: UserInfo | null;
  userFound: boolean | null;
  login: (submitedUserName: string) => void;
  logoff: () => void;
}
const UserContextDefault: UserContextInterface = {
  user: null,
  userFound: null,
  login: (submitedUserName: string) => {
    throw Error("UserContext not set!");
  },
  logoff: () => {
    throw Error("UserContext not set!");
  },
};
const UserContext = createContext<UserContextInterface>(UserContextDefault);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(UserContextDefault.user);
  const [userFound, setUserFound] = useState<boolean | null>(
    UserContextDefault.userFound
  );
  const login = (submitedUserName: string) => {
    fetchUserInfo(submitedUserName)?.then((userInfo) => {
      if (userInfo.status === "ok") {
        setUser({
          ...userInfo,
          games: shuffle(userInfo.games),
        });
        setUserFound(true);
      } else if (userInfo.status === "No User Found") {
        setUserFound(false);
      }
    });
  };
  const logoff = () => {
    setUser(null);
    setUserFound(null);
  };
  const value = useMemo(() => ({ user, userFound, login, logoff }), [
    user,
    userFound,
  ]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
