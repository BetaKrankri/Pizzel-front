import React, { useContext, useEffect, useRef, useState } from "react";
import verticalDots from "../../assets/verticalDots.png";
import { Canvas, deleteCanvas } from "../../utils/api";
import { AppContext } from "../../contexts/AppContext";
import { AuthContext } from "../../contexts/AuthContext";

const CanvasButton: React.FC<{
  canvas: Canvas;
}> = (props) => {
  const [isSubmenuOpen, toggleSubmenu] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);
  const appCtx = useContext(AppContext);
  const authCtx = useContext(AuthContext);

  const handleDelete = () => {
    console.log("Se borrara canvas", props.canvas);
    deleteCanvas(authCtx?.loggedUser, props.canvas.id)
      .then((deletedCanvas) => {
        // Actualizar portafolio de usuario logeado
        const updatedFiles = authCtx?.loggedUser.portfolios?.map(
          (portfolio) => {
            if (portfolio.id !== deletedCanvas.portfolioId) {
              return portfolio;
            } else {
              return {
                ...portfolio,
                canvases: portfolio.canvases?.filter(
                  (canvas) => canvas.id !== deletedCanvas.id
                ),
              };
            }
          }
        );

        authCtx?.updateLoggedUser((lu) => ({
          ...lu,
          portfolios: updatedFiles,
        }));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(e.target as Node)
      ) {
        toggleSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <button
      className={`CanvasButton flex py-2 px-3 items-center justify-between transition-all
       bg-slate-800 rounded border-b border-b-slate-900 shadow hover:bg-slate-700`}
      onClick={() => {
        appCtx?.setCurrentCanvas(() => props.canvas);
      }}
    >
      <div className="flex w-full  gap-3 ">
        <div className="flex justify-center items-center bg-slate-950 rounded">
          <img src="" alt="preview" className="w-14 h-14" />
        </div>

        <div className="flex flex-col w-full text-start justify-evenly">
          <p className="text-lg font-jost truncate">
            {props.canvas?.name || "Canvas name"}
          </p>
          <p className="text-xs font-jost">
            {getUpdateStatusString(props.canvas?.updatedAt)}
          </p>
        </div>
      </div>

      <div
        className={`SubmenuButton w-6 h-6 hover:bg-slate-800 ring-slate-400 p-1 rounded-sm relative ${
          isSubmenuOpen && "bg-slate-800 ring-1"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleSubmenu((sm) => !sm);
        }}
      >
        <img src={verticalDots} alt="submenu button" />
        {isSubmenuOpen && (
          <div
            ref={submenuRef}
            className="Submenu absolute bg-slate-900 hover:bg-amber-900 right-3/4 bottom-2/3 rounded"
          >
            <div className="p-1 px-2" onClick={handleDelete}>
              Delete
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

function getUpdateStatusString(dateString: Date): string {
  const today = new Date();
  const date = new Date(dateString);
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

  if (diffHours >= 24 * 30) {
    return "updated last month";
  } else if (diffHours >= 24 * 7) {
    return "updated last week";
  } else if (diffHours >= 24) {
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
