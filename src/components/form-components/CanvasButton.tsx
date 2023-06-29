import React from "react";
import verticalDots from "../../assets/verticalDots.png";
import { Canvas } from "../../utils/api";

const CanvasButton: React.FC<{ canvas: Canvas }> = ({ canvas }) => {
  return (
    <button
      className={`CanvasButton flex py-2 px-3 items-center justify-between
       bg-slate-800 hover:bg-slate-700 rounded border-b border-b-slate-900 shadow`}
    >
      <div className="flex w-full  gap-3 ">
        <div className="flex justify-center items-center bg-slate-950 rounded">
          <img src="" alt="preview" className="w-14 h-14" />
        </div>

        <div className="flex flex-col w-full text-start justify-evenly">
          <p className="text-lg font-jost truncate">
            {canvas?.name || "Canvas name"}
          </p>
          <p className="text-xs font-jost">
            {getYMDHMFormat(canvas?.updatedAt)}
          </p>
        </div>
      </div>

      <div className="w-4 h-4">
        <img src={verticalDots} alt="submenu button" />
      </div>
    </button>
  );
};

function getUpdateStatusString(dateString: Date): string {
  const today = new Date();
  const date = new Date(dateString);
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60));

  if (diffDays >= 24 * 30) {
    return "updated last month";
  } else if (diffDays >= 24 * 7) {
    return "updated last week";
  } else if (diffDays >= 24) {
    return "updated yesterday";
  } else {
    return "updated today";
  }
}

function getYMDHMFormat(dateString: Date): string {
  const date = new Date(dateString);

  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export default CanvasButton;
