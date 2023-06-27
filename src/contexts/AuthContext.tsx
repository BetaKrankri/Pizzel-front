import React, { createContext, useEffect, useState } from "react";
import { User, getAllPortfolios } from "../utils/api";

export interface IAuthContext {
  loggedUser: User;
  updateLoggedUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedUser, updateLoggedUser] = useState<User>({ token: "" });

  // Al cargar la pagina, si el contexto no tiene User.token
  // busca por un usuario almacenado en el localStorage
  useEffect(() => {
    const searchUserInfo = async () => {
      const storedInfo = localStorage.getItem("loggedUser");
      if (storedInfo) {
        const storedUser: User = JSON.parse(storedInfo);
        if (storedUser.token) {
          const synchedPortfolios = await getAllPortfolios(storedUser);
          updateLoggedUser(() => ({
            ...storedUser,
            portfolios: synchedPortfolios,
          }));
        }
      }
    };

    if (!loggedUser.token) {
      searchUserInfo();
    }

    // TODO: SYNCRONIZAR USUARIO Y SUS PORTAFOLIOS
  }, []);

  // Actualiza el localStorage al actualizarse el 'loggedUser'
  useEffect(() => {
    console.log("AuthContext > loggedUser : updates  =>", loggedUser);
    if (!loggedUser?.token) return;
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  }, [loggedUser]);

  const AuthCtxVal: IAuthContext = {
    loggedUser,
    updateLoggedUser,
  };

  return (
    <AuthContext.Provider value={AuthCtxVal}>{children}</AuthContext.Provider>
  );
};
