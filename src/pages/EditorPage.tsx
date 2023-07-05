import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/pizzel-logo.png";
import { AppContext } from "../contexts/AppContext";
import Menu from "../components/Menu";

const EditorPage: React.FunctionComponent = () => {
  const authCtx = useContext(AuthContext);
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx?.loggedUser.token && !localStorage.getItem("loggedUser")) {
      navigate("/login");
    }
  }, [authCtx?.loggedUser, navigate]);

  return (
    <div className="EditorPage w-full h-screen flex flex-col items-center relative">
      <div className="Topbar flex justify-between items-center bg-slate-900 w-full px-4 py-3">
        {/* Menu */}
        <Menu />
        <p className="text-3xl font-jost">{appCtx?.currentCanvas?.name}</p>
        <div className="flex gap-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className=" text-4xl font-jost hidden md:block">Pizzel</h1>
        </div>
      </div>
      <div className="w-full h-full">EDITOR</div>
    </div>
  );
};

export default EditorPage;
