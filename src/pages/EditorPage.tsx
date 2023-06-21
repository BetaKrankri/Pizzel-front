import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { TestAPI } from "../components/TestAPI";

const EditorPage: React.FunctionComponent = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="w-full h-screen flex flex-col items-center gap-4">
      This is the Editor Page
      <button
        className="bg-stone-800 p-4 ring ring-stone-400"
        onClick={() => {
          localStorage.removeItem("loggedUser");
          authCtx?.setLoggedUser(() => undefined);
        }}
      >
        Cerrar sesion
      </button>
      <TestAPI />
    </div>
  );
};

export default EditorPage;
