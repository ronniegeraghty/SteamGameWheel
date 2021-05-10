import React, { createContext, useState, ReactNode, useContext } from "react";

export type WheelContextType = {
  spin: boolean;
  startSpin: () => void;
  stopSpin: () => void;
  selectedGameName?: string;
  setSelectedGameName: (gameName: string) => void;
};
const WheelContextDefault: WheelContextType = {
  spin: false,
  startSpin: () => {
    throw Error("WheelContext not set!");
  },
  stopSpin: () => {
    throw Error("WheelContext not set!");
  },
  setSelectedGameName: (gameName: string) => {
    throw Error("WheelContext not set!");
  },
};
const WheelContext = createContext<WheelContextType>(WheelContextDefault);
export const WheelProvider = ({ children }: { children: ReactNode }) => {
  const [spin, setSpin] = useState(false);
  const [selectedGameName, setStateSelectedGameName] = useState<string>();
  const startSpin = () => setSpin(true);
  const stopSpin = () => setSpin(false);
  const setSelectedGameName = (gameName: string) =>
    setStateSelectedGameName(gameName);
  return (
    <WheelContext.Provider
      value={{
        spin,
        startSpin,
        stopSpin,
        selectedGameName,
        setSelectedGameName,
      }}
    >
      {children}
    </WheelContext.Provider>
  );
};
export const useWheel = () => useContext(WheelContext);
