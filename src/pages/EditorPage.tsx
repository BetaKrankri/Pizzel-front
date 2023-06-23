import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/pizzel-logo.png";
import burgerIcon from "../assets/burgerIcon.png";
import { AppContext } from "../contexts/AppContext";
import Menu from "../components/Menu";

const EditorPage: React.FunctionComponent = () => {
  const authCtx = useContext(AuthContext);
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx?.loggedUser && !localStorage.getItem("loggedUser")) {
      navigate("/login");
    }
  }, [authCtx?.loggedUser, navigate]);

  return (
    <div className="EditorPage w-full h-screen flex flex-col items-center gap-4 relative">
      {/* Menu */}
      {appCtx?.isMenuActive && (
        <div className="FogBackground absolute z-10 w-full h-full bg-stone-500/20 flex justify-center items-center">
          {/* TODO: Cerrar ventana de menu al onClick en el FogBackground */}
          <Menu />
        </div>
      )}
      <div className="Topbar flex justify-between items-center bg-slate-900 w-full px-4 py-2">
        <button
          className="hover:bg-slate-700 active:ring-1 ring-slate-400 p-1 rounded-sm"
          onClick={() => {
            // TODO: abrir el menu
            appCtx?.setIsMenuActive((ima) => !ima);
          }}
        >
          <img src={burgerIcon} alt="menu button" className="w-5" />
        </button>
        <div className="flex gap-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className=" text-4xl font-jost ">Pizzel</h1>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
