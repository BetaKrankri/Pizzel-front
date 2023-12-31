import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CanvasButton from "./CanvasButton";
import { Canvas } from "../../utils/api";
import newCanvasIcon from "../../assets/newCanvasIcon.png";

const N_LAST_RECENTS = 6;

const RecentsForm: React.FC<{
  setSelectedTab: React.Dispatch<
    React.SetStateAction<"files" | "recents" | "newcanvas" | "profile">
  >;
}> = ({ setSelectedTab }) => {
  const authCtx = useContext(AuthContext);
  const usersPortfolios = authCtx?.loggedUser.portfolios || [];
  const allCanvases: Canvas[] = usersPortfolios
    .map((portfolio) => portfolio.canvases || [])
    .flat();
  allCanvases?.sort((ca, cb) => {
    const dateA = new Date(ca.updatedAt);
    const dateB = new Date(cb.updatedAt);
    return dateB.getTime() - dateA.getTime();
  });
  const lastCvs = allCanvases?.splice(0, N_LAST_RECENTS);

  return (
    <div className="RecentsForm bg-slate-800 w-full h-full flex flex-col gap-3 px-3 py-5 transition-all duration-500">
      <div className="px-1">
        <h1 className="text-2xl sm:text-4xl font-jost font-normal sm:font-light">
          Last edited
        </h1>
      </div>
      <hr />
      <div
        className={`Wrapper w-full h-full sm:max-h-96 sm:min-h-[208px] overflow-auto 
       scrollbar-hide scroll-smooth flex flex-col gap-2 shadow`}
      >
        {lastCvs?.map((canvas) => (
          <CanvasButton canvas={canvas} key={canvas.id} />
        ))}
      </div>
      <div className="flex gap-2 w-full justify-end">
        <button
          className="p-4 rounded bg-amber-900 border-amber-900 border hover:bg-amber-800 active:border-amber-500 transition-all"
          onClick={() => setSelectedTab("newcanvas")}
        >
          <img src={newCanvasIcon} alt="addCanvas" className="w-8" />
        </button>
      </div>
    </div>
  );
};

export default RecentsForm;
