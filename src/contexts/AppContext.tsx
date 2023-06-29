import React, { createContext, useState } from "react";
import { Canvas } from "../utils/api";

interface IAppContext {
  isMenuActive: boolean;
  setIsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  currentCanvas: Canvas | undefined;
  setCurrentCanvas: React.Dispatch<React.SetStateAction<Canvas | undefined>>;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [currentCanvas, setCurrentCanvas] = useState<Canvas | undefined>(
    undefined
  );

  const AppCtxVal: IAppContext = {
    isMenuActive,
    setIsMenuActive,
    currentCanvas,
    setCurrentCanvas,
  };

  return (
    <AppContext.Provider value={AppCtxVal}>{children}</AppContext.Provider>
  );
};
