import { useState } from "react";
import TabButton from "./form-components/TabButton";
import ErrorPage from "../pages/ErrorPage";
import FilesForm from "./form-components/FilesForm";
import ProfileForm from "./form-components/ProfileForm";
import NewCanvaForm from "./form-components/NewCanvaForm";
import RecentsForm from "./form-components/RecentsForm";

const TABS = {
  files: "Files",
  recents: "Recents",
  newcanvas: "New Canvas",
  profile: "Profile",
};

const Menu = () => {
  const [selectedTab, setSelectedTab] = useState<keyof typeof TABS>("files");

  const renderMenuForm = () => {
    switch (selectedTab) {
      case "files":
        return <FilesForm />;
        break;
      case "recents":
        return <RecentsForm />;
        break;
      case "newcanvas":
        return <NewCanvaForm />;
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
    <div className="Menu rounded overflow-hidden flex shadow-xl transition-all">
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
      </div>
      {renderMenuForm()}
    </div>
  );
};

export default Menu;
