import React, { createContext, useState } from "react";

interface User {
  token: string;
  displayName?: string;
  email?: string;
}

interface IAuthContext {
  logedUser: User | undefined;
  setLogedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [logedUser, setLogedUser] = useState<User | undefined>(undefined);

  const AuthCtxVal: IAuthContext = { logedUser, setLogedUser };

  return (
    <AuthContext.Provider value={AuthCtxVal}>{children}</AuthContext.Provider>
  );
};
