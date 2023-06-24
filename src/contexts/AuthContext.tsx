import React, { createContext, useEffect, useState } from "react";
import { User } from "../utils/api";

export interface IAuthContext {
  loggedUser: User;
  setLoggedUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<User>({ token: "" });

  useEffect(() => {
    if (!loggedUser.token) {
      const storedInfo = localStorage.getItem("loggedUser");

      if (storedInfo) {
        const storedUser: User = JSON.parse(storedInfo);
        storedUser.token && setLoggedUser(() => storedUser);
      }
    }
  }, []);

  useEffect(() => {
    console.log("AuthContext > loggedUser : updates  =>", loggedUser);
    if (!loggedUser?.token) return;
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  }, [loggedUser]);

  const AuthCtxVal: IAuthContext = { loggedUser, setLoggedUser };

  return (
    <AuthContext.Provider value={AuthCtxVal}>{children}</AuthContext.Provider>
  );
};
