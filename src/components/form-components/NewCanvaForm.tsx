import { useContext, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { AuthContext } from "../../contexts/AuthContext";
import { createCanvas, newSketch, updateCanvas } from "../../utils/api";

const PRESETS_SIZES = [
  { w: 16, h: 16 },
  { w: 32, h: 32 },
  { w: 64, h: 64 },
  { w: 256, h: 256 },
  { w: 100, h: 100 },
  { w: 256, h: 144 },
  { w: 300, h: 300 },
];

interface FormData {
  canvasName: string;
  width: number;
  height: number;
  portfolioId: string;
}

const initialForm = {
  canvasName: "",
  width: 16,
  height: 16,
  portfolioId: "",
};

function NewCanvasForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const authCtx = useContext(AuthContext);
  const portfoliosList = authCtx?.loggedUser.portfolios || [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCanvas(authCtx?.loggedUser, form.portfolioId, form.canvasName)
      // crea un nuevo Canvas con sketch
      .then((newCanvas) =>
        updateCanvas(authCtx?.loggedUser, newCanvas.id, {
          name: newCanvas.name,
          sketch: newSketch(form.width, form.height),
        })
      )
      .then((newCanvas) => {
        // Actualiza los portfolios del usuario loggeado.
        const updatedFiles = authCtx?.loggedUser.portfolios?.map(
          (portfolio) => {
            if (portfolio.id !== newCanvas.portfolioId) {
              return portfolio;
            } else {
              return {
                ...portfolio,
                canvases: [...(portfolio?.canvases || []), newCanvas],
              };
            }
          }
        );

        authCtx?.updateLoggedUser((lu) => ({
          ...lu,
          portfolios: updatedFiles,
        }));
      })
      .then(() => setForm(initialForm))
      // .then(Abrir el canvas)
      .catch((error) => console.error(error));
  };

  return (
    <div className="NewCanvasForm bg-slate-800 w-full h-full flex flex-col gap-3 px-3 py-5 transition-all">
      <div className="px-1">
        <h1 className="text-4xl font-poppins font-light">New Canvas</h1>
      </div>
      <hr />
      <form
        className={`Wrapper min-h-[200px] overflow-auto w-80
       scrollbar-hide scroll-smooth flex flex-col gap-3 shadow font-jost`}
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          value={form.canvasName}
          label="Title"
          labelStyle=""
          placeholder="a fancy canvas name"
          required
          onChange={(e) =>
            setForm((f) => ({ ...f, canvasName: e.target.value }))
          }
        />

        <div className="SizeForm flex gap-2">
          <Input
            type="number"
            label="Width"
            value={form.width}
            placeholder="16"
            min={4}
            max={300}
            required
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
            required
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

        <div className="PresetsSection flex flex-col gap-1">
          <p>Presets</p>
          <div className="w-full overflow-x-auto flex gap-2 scrollbar-hide">
            {PRESETS_SIZES.map((ps, i) => (
              <button
                key={i}
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
          required
          label="Portfolio"
          placeholder="-- Select a Portfolio --"
          value={form.portfolioId}
          onChange={(e) =>
            setForm((f) => ({ ...f, portfolioId: e.target.value }))
          }
        >
          {portfoliosList.map((portfolio) => (
            <option key={portfolio.id} value={portfolio.id}>
              {portfolio.name}
            </option>
          ))}
        </Select>

        <div />
        <div />

        <button className="p-4 rounded bg-amber-900 border-amber-900 border hover:bg-amber-800 active:border-amber-500 ">
          Create Canvas
        </button>
      </form>
    </div>
  );
}

export default NewCanvasForm;
