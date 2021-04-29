import React, { ReactNode } from "react";
import { AppStateProvider } from "../../hooks/useAppState";
import { UserProvider } from "../../hooks/UseUser";

const ContentProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppStateProvider>
      <UserProvider>{children}</UserProvider>
    </AppStateProvider>
  );
};

export default ContentProvider;
