import React, {
  createContext,
  ReactNode,
  useMemo,
  useState,
  useContext,
} from "react";

interface AppStateContextInterface {
  debugModeEnable: boolean;
}
const AppStateContextDefault: AppStateContextInterface = {
  debugModeEnable: false,
};
const AppStateContext = createContext<AppStateContextInterface>(
  AppStateContextDefault
);
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [debugModeEnable, setDebugModeEnable] = useState(
    AppStateContextDefault.debugModeEnable
  );
  const value = useMemo(() => ({ debugModeEnable, setDebugModeEnable }), [
    debugModeEnable,
  ]);
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
export const useAppState = () => useContext(AppStateContext);
