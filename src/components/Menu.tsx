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
  profile: "Profile",
  files: "Files",
  recents: "Recents",
  newcanvas: "New Canvas",
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
          className="Fog absolute z-10 top-16 left-0 right-0 bottom-0 bg-stone-700/70 flex justify-center items-center"
          // TODO: ** Quitar este onClick y ponerlo en un boton a fuera del menu ....
          onClick={() => {
            appCtx?.setIsMenuActive(false);
          }}
        >
          <div
            className="Menu rounded overflow-hidden flex flex-col sm:flex-row shadow-xl w-full h-full sm:w-auto sm:h-auto "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="Tab flex sm:flex-col items-center md:gap-2 sm:w-40 bg-slate-950 overflow-auto scrollbar-hide">
              {Object.entries(TABS).map((tab, i, ar) => (
                <>
                  <TabButton
                    key={tab[0]}
                    label={tab[1]}
                    isActive={selectedTab === tab[0]}
                    onClick={() => {
                      setSelectedTab(tab[0] as keyof typeof TABS);
                    }}
                  />
                  {i < ar.length - 1 && (
                    <div className="Separator border border-slate-100/5 h-4/6 sm:hidden" />
                  )}
                </>
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
            <div className="w-full h-full sm:w-96">{renderMenuForm()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
