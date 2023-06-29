import { useContext, useState, useEffect } from "react";
import TabButton from "./form-components/TabButton";
import ErrorPage from "../pages/ErrorPage";
import FilesForm from "./form-components/FilesForm";
import ProfileForm from "./form-components/ProfileForm";
import NewCanvasForm from "./form-components/NewCanvaForm";
import RecentsForm from "./form-components/RecentsForm";
import { AppContext } from "../contexts/AppContext";
import burgerIcon from "../assets/burgerIcon.png";

const TABS = {
  files: "Files",
  recents: "Recents",
  newcanvas: "New Canvas",
  profile: "Profile",
};

const Menu = () => {
  const [selectedTab, setSelectedTab] = useState<keyof typeof TABS>("files");
  const appCtx = useContext(AppContext);
  //
  const renderMenuForm = () => {
    switch (selectedTab) {
      case "files":
        return <FilesForm setSelectedTab={setSelectedTab} />;
        break;
      case "recents":
        return <RecentsForm setSelectedTab={setSelectedTab} />;
        break;
      case "newcanvas":
        return <NewCanvasForm />;
        break;
      case "profile":
        return <ProfileForm />;
        break;
      default:
        return <ErrorPage />;
        break;
    }
  };

  return (
    <>
      <button
        className="hover:bg-slate-700 active:ring-1 ring-slate-400 p-1 rounded-sm"
        onClick={() => {
          appCtx?.setIsMenuActive((ima) => !ima);
        }}
      >
        <img src={burgerIcon} alt="menu button" className="w-5" />
      </button>
      {(appCtx?.isMenuActive || !appCtx?.currentCanvas) && (
        <div
          className="FogBackground absolute z-10 top-0 left-0 right-0 bottom-0 bg-stone-700/70 flex justify-center items-center"
          //
          // TODO: ** Quitar este onClick y ponerlo en un boton a fuera del menu ....
          //
          onClick={() => {
            appCtx?.setIsMenuActive(false);
          }}
        >
          <div
            className="Menu rounded overflow-hidden flex shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="Tab flex flex-col bg-slate-950">
              {Object.entries(TABS).map((tab) => (
                <TabButton
                  key={tab[0]}
                  label={tab[1]}
                  isActive={selectedTab === tab[0]}
                  onClick={() => {
                    setSelectedTab(tab[0] as keyof typeof TABS);
                  }}
                />
              ))}
              {/* /// 
              <TabButton
                label={"Tester Page"}
                isActive={false}
                onClick={() => {
                  navigate("/test");
                }}
              />*/}
            </div>
            <div className="Form  ">
              <div className="h-full w-full ">{renderMenuForm()}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
