import React, { ReactNode } from "react";
import { AppStateProvider } from "../../hooks/useAppState";
import { UserProvider } from "../../hooks/UseUser";
import { WheelProvider } from "../../hooks/useWheel";
const ContentProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppStateProvider>
      <UserProvider>
        <WheelProvider>{children}</WheelProvider>
      </UserProvider>
    </AppStateProvider>
  );
};

export default ContentProvider;
