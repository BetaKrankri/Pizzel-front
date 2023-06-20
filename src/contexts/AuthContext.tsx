import React, { createContext, useEffect, useState } from "react";

interface User {
  token: string;
  displayName?: string;
  email?: string;
}

interface IAuthContext {
  loggedUser: User | undefined;
  setLoggedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    storedUser && setLoggedUser(() => JSON.parse(storedUser));
  }, []);
  // TODO: Hacer que persista el usuario incluso al recargar la pestaña. Usando localStorage

  const AuthCtxVal: IAuthContext = { loggedUser, setLoggedUser };

  return (
    <AuthContext.Provider value={AuthCtxVal}>{children}</AuthContext.Provider>
  );
};
