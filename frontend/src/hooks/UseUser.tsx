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
  login: (submitedUserName: string) => void;
  logoff: () => void;
}
const UserContextDefault: UserContextInterface = {
  user: null,
  login: (submitedUserName: string) => {
    throw Error("UserContext not set!");
  },
  logoff: () => {
    throw Error("UserContext not set!");
  },
};
const UserContext = createContext<UserContextInterface>(UserContextDefault);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const login = (submitedUserName: string) => {
    fetchUserInfo(submitedUserName)?.then((userInfo) => {
      if (userInfo.status === "ok") {
        setUser({
          ...userInfo,
          games: shuffle(userInfo.games),
        });
      } else if (userInfo.status === "No User Found") {
        setUser(null);
      }
    });
  };
  const logoff = () => {
    setUser(null);
  };
  const value = useMemo(() => ({ user, login, logoff }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
