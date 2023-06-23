import { useState } from "react";
import Input from "./Input";
import Select from "./Select";

const PRESETS_SIZES = [
  { w: 16, h: 16 },
  { w: 32, h: 32 },
  { w: 64, h: 64 },
  { w: 256, h: 256 },
  { w: 100, h: 100 },
  { w: 256, h: 144 },
  { w: 300, h: 300 },
];

function NewCanvasForm() {
  const [form, setForm] = useState<{
    canvasName: string;
    width: number;
    height: number;
  }>({
    canvasName: "",
    width: 16,
    height: 16,
  });

  return (
    <div className="NewCanvasForm bg-slate-800 w-full h-full flex flex-col gap-3 p-3 transition-all">
      <div className="px-1">
        <h1 className="text-4xl font-poppins font-light">New Canvas</h1>
      </div>
      <hr />
      <form
        className={`Wrapper min-h-[200px] overflow-auto w-80
       scrollbar-hide scroll-smooth flex flex-col gap-3 shadow font-jost`}
      >
        <Input
          type="text"
          value={form.canvasName}
          label="Title"
          labelStyle=""
          placeholder="a fancy canvas name"
          onChange={(e) =>
            setForm((f) => ({ ...f, canvasName: e.target.value }))
          }
        />

        <div className="flex gap-2">
          <Input
            type="number"
            label="Width"
            value={form.width}
            placeholder="16"
            min={4}
            max={300}
            onChange={(e) => {
              const w =
                Number(e.target.value) > 300
                  ? 300
                  : Number(e.target.value) < 4
                  ? 4
                  : Number(e.target.value);
              setForm((f) => {
                return { ...f, width: w };
              });
            }}
          />
          <Input
            type="number"
            label="height"
            value={form.height}
            placeholder="16"
            min={4}
            max={300}
            onChange={(e) => {
              const w =
                Number(e.target.value) > 300
                  ? 300
                  : Number(e.target.value) < 4
                  ? 4
                  : Number(e.target.value);
              setForm((f) => {
                return { ...f, height: w };
              });
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Presets</p>
          <div className="w-full overflow-x-auto flex gap-2 scrollbar-hide">
            {PRESETS_SIZES.map((ps) => (
              <button
                className="p-4 bg-stone-700 rounded w-40 hover:border-stone-500 border-stone-700 border"
                onClick={(e) => {
                  e.preventDefault();
                  setForm((f) => ({ ...f, width: ps.w, height: ps.h }));
                }}
              >
                {`${ps.w}x${ps.h}`}
              </button>
            ))}
          </div>
        </div>

        {/* TODO: Obtener las opciones de portafolio */}
        <Select
          label="Select Portfolio"
          options={["portfolio1", "portfolio1", "portfolio1"]}
          onChange={() => {}}
        />
      </form>
    </div>
  );
}

export default NewCanvasForm;
