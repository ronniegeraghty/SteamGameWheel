import React, { createContext, useState, ReactNode, useContext } from "react";

export type WheelContextType = {
  spin: boolean;
  startSpin: () => void;
  stopSpin: () => void;
};
const WheelContextDefault: WheelContextType = {
  spin: false,
  startSpin: () => {
    throw Error("WheelContext not set!");
  },
  stopSpin: () => {
    throw Error("WheelContext not set!");
  },
};
const WheelContext = createContext<WheelContextType>(WheelContextDefault);
export const WheelProvider = ({ children }: { children: ReactNode }) => {
  const [spin, setSpin] = useState(false);
  const startSpin = () => setSpin(true);
  const stopSpin = () => setSpin(false);
  return (
    <WheelContext.Provider value={{ spin, startSpin, stopSpin }}>
      {children}
    </WheelContext.Provider>
  );
};
export const useWheel = () => useContext(WheelContext);
