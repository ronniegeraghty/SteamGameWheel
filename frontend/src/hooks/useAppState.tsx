import React, {
  createContext,
  ReactNode,
  useMemo,
  useState,
  useContext,
  useDebugValue,
} from "react";

interface AppStateContextInterface {
  debugModeEnable: boolean;
  enableDebug: () => void;
}
const AppStateContextDefault: AppStateContextInterface = {
  debugModeEnable: false,
  enableDebug: () => {
    throw Error("AppStateContext not set!");
  },
};
const AppStateContext = createContext<AppStateContextInterface>(
  AppStateContextDefault
);
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [debugModeEnable, setDebugModeEnable] = useState(
    AppStateContextDefault.debugModeEnable
  );
  const enableDebug = () => setDebugModeEnable(true);
  const value = useMemo(() => ({ debugModeEnable, enableDebug }), [
    debugModeEnable,
  ]);
  useDebugValue(debugModeEnable);
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
export const useAppState = () => useContext(AppStateContext);
