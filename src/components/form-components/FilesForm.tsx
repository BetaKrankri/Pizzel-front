import { useContext } from "react";
import CanvasButton from "./CanvasButton";
import PortfolioButton from "./PortfolioButton";
import { AuthContext } from "../../contexts/AuthContext";

function FilesForm() {
  const authCtx = useContext(AuthContext);
  const filteredPortfolios = authCtx?.loggedUser.portfolios?.filter(
    (portfolio) => portfolio.name !== "root"
  );
  const rootCanvases = authCtx?.loggedUser.portfolios?.filter(
    (portfolio) => portfolio.name === "root"
  )[0]?.canvases;

  return (
    <div className="FilesForm bg-slate-800 w-full h-full flex flex-col gap-3 p-3 transition-all">
      <div className="px-1">
        <h1 className="text-4xl font-poppins font-light">Files</h1>
      </div>
      <hr />
      <div
        className={`Wrapper w-80 max-h-80 min-h-[200px] overflow-auto
       scrollbar-hide scroll-smooth flex flex-col gap-2 shadow`}
      >
        {filteredPortfolios?.map((portfolio) => (
          <PortfolioButton portfolio={portfolio} key={portfolio.id} />
        ))}
        {rootCanvases?.map((canvas) => (
          <CanvasButton canvas={canvas} key={canvas.id} />
        ))}
      </div>
    </div>
  );
}

export default FilesForm;
