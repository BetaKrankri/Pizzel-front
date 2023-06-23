import CanvasButton from "./CanvasButton";

function RecentsForm() {
  return (
    <div className="RecentsForm bg-slate-800 w-full h-full flex flex-col gap-3 p-3 transition-all duration-500">
      <div className="px-1">
        <h1 className="text-4xl font-poppins font-light">Last edited</h1>
      </div>
      <hr />
      <div
        className={`Wrapper w-80 max-h-80 min-h-[200px] overflow-auto
       scrollbar-hide scroll-smooth flex flex-col gap-2 shadow`}
      >
        <CanvasButton canvas={undefined} />
        <CanvasButton canvas={undefined} />
        <CanvasButton canvas={undefined} />
      </div>
    </div>
  );
}

export default RecentsForm;
