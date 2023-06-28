import React, { createContext, useEffect, useState } from "react";
import { User, getFiles } from "../utils/api";

export interface IAuthContext {
  loggedUser: User;
  updateLoggedUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //TODO: actualizar el estado del contexto. (Estaria padre usar un Reducer)

  const [loggedUser, updateLoggedUser] = useState<User>({ token: "" });

  // Al cargar la pagina, si el contexto no tiene 'User.token'
  // busca por un usuario almacenado en el localStorage
  useEffect(() => {
    const searchUserToken = () => {
      const storedInfo = localStorage.getItem("loggedUser");
      if (storedInfo) {
        const storedUser: User = JSON.parse(storedInfo);
        if (storedUser.token) {
          // Si existe un token guardado, actualiza el contexto con la info
          updateLoggedUser(() => ({
            ...storedUser,
          }));
        }
      }
    };

    if (!loggedUser.token) {
      searchUserToken();
    }
  }, []);

  useEffect(() => {
    if (!loggedUser.token) return;
    getFiles(loggedUser).then((files) => {
      updateLoggedUser((lu) => ({ ...lu, portfolios: files }));
    });
  }, [loggedUser.token]);

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
