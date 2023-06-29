import newPortfolioIcon from "../../assets/newPortfolioIcon.png";
import closeIcon from "../../assets/closeIcon.png";
import { useState, useContext, FormEvent, useRef, useEffect } from "react";
import Input from "./Input";
import { createPortfolio } from "../../utils/api";
import { AuthContext } from "../../contexts/AuthContext";

const NewPortfolioForm = () => {
  const authCtx = useContext(AuthContext);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState("");

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Verificar que el nombre no se repita en la lista de Portfolios
    createPortfolio(authCtx?.loggedUser, form)
      .then((newPortfolio) => {
        const portfolios = authCtx?.loggedUser.portfolios || [];
        newPortfolio && portfolios.push(newPortfolio);
        authCtx?.updateLoggedUser((lu) => ({
          ...lu,
          portfolios: [...portfolios],
        }));
      })
      .then(() => {
        setForm("");
        setIsOpen(false);
      });
  };

  return (
    <>
      <button
        className="p-4 rounded bg-amber-900 border-amber-900 border hover:bg-amber-800 active:border-amber-500 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <img src={newPortfolioIcon} alt="addCanvas" className="w-8" />
      </button>
      {/* Formulario secundario */}
      <div
        className={`Fog absolute top-0 bottom-0 flex items-center justify-center w-full ${
          isOpen && "bg-slate-800/70 left-0 "
        } ${
          !isOpen && "bg-slate-300/10 left-full rounded-tl-3xl rounded-bl-3xl"
        } transition-all duration-150 ease-linear`}
      >
        <form
          ref={formRef}
          className="bg-slate-950 p-4 pb-6 flex flex-col  rounded font-jost w-10/12"
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className=" self-end hover:bg-slate-700 active:ring-1 ring-slate-400 p-1 rounded-sm "
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            <img src={closeIcon} alt="close" className="w-4" />
          </button>
          <h1 className="text-2xl font-host text-center mb-4">
            Create Portfolio
          </h1>
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              label="Name"
              placeholder="new portfolio name"
              value={form}
              required
              onChange={(e) => setForm(e.target.value)}
            />
            <button className="self-end gap-3 py-3 px-4 rounded flex items-center justify-around bg-amber-900 border-amber-900 border hover:bg-amber-800 active:border-amber-500 transition-all ">
              <img src={newPortfolioIcon} alt="addCanvas" className="w-6" />
              <p className="">Add Portfolio</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPortfolioForm;
