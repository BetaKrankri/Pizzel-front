import verticalDots from "../../assets/verticalDots.png";
import { Portfolio, Canvas } from "../../utils/api";

const PortfolioButton: React.FC<{
  portfolio: Portfolio | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}> = (props) => {
  return (
    <button
      className={`PortfolioButton flex items-center justify-between text-start py-2 px-3
         bg-slate-800 hover:bg-slate-700 rounded border-b border-b-slate-700 shadow-lg`}
      onClick={props.onClick}
    >
      <div className="flex flex-col w-full gap-1">
        <p className="truncate text-lg font-jost ">
          {props.portfolio?.name || "Portfolio name"}
        </p>
        <p className="text-sm font-jost">
          {getCanvasString(props.portfolio?.canvases)}
        </p>
      </div>

      <div className="w-4 h-4">
        <img src={verticalDots} alt="submenu button" />
      </div>
    </button>
  );
};

const getCanvasString = (canvases: Canvas[] | undefined) =>
  `${canvases?.length || 0} canvas${canvases?.length === 1 ? "" : "es"}`;

export default PortfolioButton;
