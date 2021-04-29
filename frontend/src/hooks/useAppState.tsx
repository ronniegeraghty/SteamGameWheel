import React, {
  createContext,
  ReactNode,
  useMemo,
  useState,
  useContext,
  useDebugValue,
  useCallback,
} from "react";

export type AppStateContextType = {
  debugModeEnable: boolean;
  enableDebug: () => void;
  testArr: string[];
  setTestArraySize: (size: number) => void;
};
const AppStateContextDefault: AppStateContextType = {
  debugModeEnable: false,
  enableDebug: () => {
    throw Error("AppStateContext not set!");
  },
  testArr: [],
  setTestArraySize: (size: number) => {
    throw Error("AppStateContext not set!");
  },
};
const AppStateContext = createContext<AppStateContextType>(
  AppStateContextDefault
);
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [debugModeEnable, setDebugModeEnable] = useState(
    AppStateContextDefault.debugModeEnable
  );
  const enableDebug = () => setDebugModeEnable(true);
  const [testArr, setTestArr] = useState(stringArray(50));
  const setTestArraySize = (size: number) => setTestArr(stringArray(size));
  const value = useMemo(
    () => ({ debugModeEnable, enableDebug, testArr, setTestArraySize }),
    [debugModeEnable, testArr]
  );
  useDebugValue(debugModeEnable);
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
export const useAppState = () => useContext(AppStateContext);

function stringArray(size: number) {
  let temp = [];
  for (let i = 0; i < size; i++) {
    temp.push("");
  }
  return temp;
}
