import { useEffect, useState, useContext } from "react";
import CanvasButton from "./CanvasButton";
import PortfolioButton from "./PortfolioButton";
import { getAllPortfolios, Canvas, Portfolio } from "../../utils/api";
import { AuthContext } from "../../contexts/AuthContext";

function FilesForm() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [rootFiles, setRootFiles] = useState<Canvas[]>([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const searchPortfolios = async () => {
      const usersPortfolios = await getAllPortfolios(authCtx?.loggedUser);
      const filteredPortfolios = usersPortfolios.filter(
        (portfolio) => portfolio.name !== "root"
      );
      const rootCanvases = usersPortfolios.filter(
        (portfolio) => portfolio.name === "root"
      )[0].canvases;

      setPortfolios(filteredPortfolios);
      setRootFiles(rootCanvases);
      console.log(filteredPortfolios);
      console.log(rootCanvases);
    };

    searchPortfolios();
  }, [authCtx?.loggedUser]);

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
        {portfolios.map((portfolio) => (
          <PortfolioButton portfolio={portfolio} key={portfolio.id} />
        ))}
        {rootFiles.map((canvas) => (
          <CanvasButton canvas={canvas} key={canvas.id} />
        ))}
      </div>
    </div>
  );
}

export default FilesForm;
