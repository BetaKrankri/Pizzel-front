import CanvasButton from "./CanvasButton";
import PortfolioButton from "./PortfolioButton";

function FilesForm() {
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
        <PortfolioButton portfolio={undefined} />
        <PortfolioButton portfolio={undefined} />
        <PortfolioButton portfolio={undefined} />
        <CanvasButton canvas={undefined} />
        <CanvasButton canvas={undefined} />
        <CanvasButton canvas={undefined} />
      </div>
    </div>
  );
}

export default FilesForm;
