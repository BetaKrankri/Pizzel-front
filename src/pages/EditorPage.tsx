import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const EditorPage: React.FunctionComponent = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx?.loggedUser && !localStorage.getItem("loggedUser")) {
      navigate("/login");
    }
  }, [authCtx?.loggedUser, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center gap-4">
      This is the Editor Page
      <button
        className="bg-emerald-800 p-2 ring ring-stone-400 w-fit"
        onClick={() => {
          localStorage.removeItem("loggedUser");
          authCtx?.setLoggedUser(() => undefined);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default EditorPage;
