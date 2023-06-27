import React, { createContext, useState } from "react";

interface IAppContext {
  isMenuActive: boolean;
  setIsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const AppCtxVal: IAppContext = { isMenuActive, setIsMenuActive };

  return (
    <AppContext.Provider value={AppCtxVal}>{children}</AppContext.Provider>
  );
};
