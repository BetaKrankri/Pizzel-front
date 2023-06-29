import { useContext, useState } from "react";
import CanvasButton from "./CanvasButton";
import PortfolioButton from "./PortfolioButton";
import { AuthContext } from "../../contexts/AuthContext";
import newCanvasIcon from "../../assets/newCanvasIcon.png";
import NewPortfolioForm from "./NewPortfolioForm";
import { Portfolio } from "../../utils/api";
import leftArrowIcon from "../../assets/leftArrowIcon.png";

const FilesForm: React.FC<{
  setSelectedTab: React.Dispatch<
    React.SetStateAction<"files" | "recents" | "newcanvas" | "profile">
  >;
}> = (props) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<
    Portfolio | undefined
  >(undefined);
  const authCtx = useContext(AuthContext);

  const filteredPortfolios = authCtx?.loggedUser.portfolios?.filter(
    (portfolio) => portfolio.name !== "root"
  );
  const rootCanvases =
    authCtx?.loggedUser.portfolios?.filter(
      (portfolio) => portfolio.name === "root"
    )[0]?.canvases || [];

  return (
    <div className="FilesForm bg-slate-800 w-full h-full flex flex-col gap-3 p-3 transition-all relative overflow-hidden">
      {/*  */}

      <div
        className={`SubFilesform flex flex-col gap-3 p-3 absolute bottom-0 top-0 w-full
          bg-slate-800 ${selectedPortfolio && "right-0"} ${
          !selectedPortfolio && "right-full"
        } transition-all duration-150 ease-linear`}
      >
        <div className="px-1 flex items-center gap-2 ">
          <button
            className="w-6 hover:bg-slate-700 active:ring-1 ring-slate-400 py-1 rounded-sm"
            onClick={() => setSelectedPortfolio(undefined)}
          >
            <img src={leftArrowIcon} alt="back" />
          </button>
          <h1 className="text-3xl font-poppins font-light trancated">
            {selectedPortfolio?.name}
          </h1>
        </div>
        <hr />
        <div
          className={`Wrapper w-80 max-h-80 min-h-[300px] overflow-auto
       scrollbar-hide scroll-smooth flex flex-col gap-2 shadow`}
        >
          {selectedPortfolio?.canvases?.map((canvas) => (
            <CanvasButton
              key={canvas.id}
              canvas={canvas}
              onClick={() => {
                console.log(`'${canvas.name}' canvas selected`);
              }}
            />
          ))}
        </div>
      </div>

      {/*  */}
      <div className="px-1">
        <h1 className="text-4xl font-poppins font-light">Files</h1>
      </div>
      <hr />
      <div
        className={`Wrapper w-80 max-h-80 min-h-[300px] overflow-auto
       scrollbar-hide scroll-smooth flex flex-col gap-2 shadow`}
      >
        {filteredPortfolios?.map((portfolio) => (
          <PortfolioButton
            portfolio={portfolio}
            key={portfolio.id}
            onClick={() => setSelectedPortfolio(portfolio)}
          />
        ))}
        {rootCanvases?.map((canvas) => (
          <CanvasButton
            canvas={canvas}
            key={canvas.id}
            onClick={() => {
              console.log(`'${canvas.name}' canvas selected`);
            }}
          />
        ))}
      </div>
      <div className="flex gap-2 w-full justify-end">
        <button
          className="p-4 rounded bg-amber-900 border-amber-900 border hover:bg-amber-800 active:border-amber-500 transition-all"
          onClick={() => props.setSelectedTab("newcanvas")}
        >
          <img src={newCanvasIcon} alt="addCanvas" className="w-8" />
        </button>
        <NewPortfolioForm />
      </div>
    </div>
  );
};

export default FilesForm;
