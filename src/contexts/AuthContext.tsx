import React, { createContext, useEffect, useState } from "react";
import { User } from "../utils/api";

export interface IAuthContext {
  loggedUser: User | undefined;
  setLoggedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!loggedUser) {
      const storedUser = localStorage.getItem("loggedUser");
      storedUser && setLoggedUser(() => JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    console.log("AuthContext > loggedUser : updates  =>", loggedUser);
  }, [loggedUser]);

  const AuthCtxVal: IAuthContext = { loggedUser, setLoggedUser };

  return (
    <AuthContext.Provider value={AuthCtxVal}>{children}</AuthContext.Provider>
  );
};
