// Este componente solo funciona cunando esta en un
// contexto AuthContext donde si existan sus valores loggedUser

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  createCanvas,
  createPortfolio,
  createUser,
  deleteCanvas,
  deletePortfolio,
  getAllCanvases,
  getAllPortfolios,
  getCanvas,
  getPortfolio,
  loginUser,
  updateCanvas,
  updatePortfolio,
} from "../utils/api";
import Input from "../components/form-components/Input";
import { useNavigate } from "react-router-dom";

const TesterPage = () => {
  const [response, setResponse] = useState({ APIfunction: "", res: {} });
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const [input7, setInput7] = useState("");
  const [input8, setInput8] = useState("");
  const [input9, setInput9] = useState("");
  const [input10, setInput10] = useState("");
  const [input11, setInput11] = useState("");
  const [input12, setInput12] = useState("");
  const [input13, setInput13] = useState("");
  const [input14, setInput14] = useState("");
  const [input15, setInput15] = useState("");
  const [input16, setInput16] = useState("");
  const [input17, setInput17] = useState("");
  const [input18, setInput18] = useState("");

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx?.loggedUser && !localStorage.getItem("loggedUser")) {
      navigate("/login");
    }
  }, [authCtx?.loggedUser, navigate]);

  useEffect(() => {
    if (response.APIfunction) {
      console.log(`${response.APIfunction}`, response.res);
    }
  }, [response]);

  return (
    <div className="items-center w-full h-screen text-sm  flex flex-col">
      <div className=" bg-emerald-400 max-w-full break-words text-black flex flex-col gap-3 ">
        <p>{authCtx?.loggedUser?.displayName}</p>
        <p>{authCtx?.loggedUser?.email}</p>
        <p className="break-words">{authCtx?.loggedUser?.token}</p>

        <button
          className="bg-emerald-800 p-2 ring ring-stone-400 w-fit"
          onClick={() => {
            localStorage.removeItem("loggedUser");
            authCtx?.setLoggedUser(() => undefined);
          }}
        >
          Logout
        </button>
      </div>
      {/* Start Portfolio Panel */}

      <div className="API/Portfolio bg-slate-400 p-3  gap-2 items-start flex flex-wrap">
        {/*  GET ALL PORTFOLIOS */}
        <button
          className="p-2 bg-sky-900"
          onClick={async () => {
            const allPortfolios = await getAllPortfolios(authCtx?.loggedUser);
            setResponse(() => ({
              APIfunction: "getAllPortfolios",
              res: allPortfolios,
            }));
          }}
        >
          getAllPortfolios
        </button>
        {/* CREATE PORTFOLIO */}
        <form
          className="ring ring-slate-500 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const newPortfolio = await createPortfolio(
              authCtx?.loggedUser,
              input1
            );
            setResponse(() => ({
              APIfunction: "createPortfolio",
              res: newPortfolio,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="new portfolio name"
            value={input1}
            onChange={(e) => {
              setInput1(e.target.value);
            }}
          />
          <button className="p-2 bg-sky-900">createPortfolio</button>
        </form>
        {/* UPDATE PORTFOLIO */}
        <form
          className="ring ring-slate-500 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const updatedPortfolio = await updatePortfolio(
              authCtx?.loggedUser,
              input3,
              input2
            );
            setResponse(() => ({
              APIfunction: "updatePortfolio",
              res: updatedPortfolio,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="portfolio id"
            value={input3}
            onChange={(e) => {
              setInput3(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="new portfolio name"
            value={input2}
            onChange={(e) => {
              setInput2(e.target.value);
            }}
          />
          <button className="p-2 bg-sky-900">updatePortfolio</button>
        </form>
        {/* DELETE PORTFOLIO */}
        <form
          className="ring ring-slate-500 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const deletedPortfolio = await deletePortfolio(
              authCtx?.loggedUser,
              input4
            );
            setResponse(() => ({
              APIfunction: "deletePortfolio",
              res: deletedPortfolio,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="portfolio id"
            value={input4}
            onChange={(e) => {
              setInput4(e.target.value);
            }}
          />
          <button className="p-2 bg-sky-900">deletePortfolio</button>
        </form>
        {/* GET A SINGLE PORTFOLIO */}
        <form
          className="ring ring-slate-500 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const portfolio = await getPortfolio(authCtx?.loggedUser, input13);
            setResponse(() => ({
              APIfunction: "getPortfolio",
              res: portfolio,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="portfolio id"
            value={input13}
            onChange={(e) => {
              setInput13(e.target.value);
            }}
          />
          <button className="p-2 bg-sky-900">getPortfolio</button>
        </form>
      </div>

      {/* Start Canvas Panel */}
      <div className="API/Canvas bg-stone-400 p-3  items-start gap-2  flex flex-wrap">
        {/* GET ALL CANVASES */}
        <button
          className="p-2 bg-amber-900"
          onClick={async () => {
            const allCanvases = await getAllCanvases(authCtx?.loggedUser);
            setResponse(() => ({
              APIfunction: "getAllCanvases",
              res: allCanvases,
            }));
          }}
        >
          getAllCanvases
        </button>
        {/* CREATE CANVAS */}
        <form
          className="ring ring-amber-500 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const canvaCreated = await createCanvas(
              authCtx?.loggedUser,
              input5,
              input6
            );
            setResponse(() => ({
              APIfunction: "createCanva",
              res: canvaCreated,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="add to portfolio"
            value={input5}
            onChange={(e) => {
              setInput5(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="new canva name"
            value={input6}
            onChange={(e) => {
              setInput6(e.target.value);
            }}
          />
          <button className="p-2 bg-amber-900">createCanvas</button>
        </form>
        {/* DELETE CANVAS */}
        <form
          className="ring ring-amber-500 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const deletedCanvas = await deleteCanvas(
              authCtx?.loggedUser,
              input7
            );
            setResponse(() => ({
              APIfunction: "deleteCanvas",
              res: deletedCanvas,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="canvas id"
            value={input7}
            onChange={(e) => {
              setInput7(e.target.value);
            }}
          />
          <button className="p-2 bg-amber-900">deleteCanvas</button>
        </form>
        {/* GET CANVAS  */}
        <form
          className="ring ring-amber-500 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const canvas = await getCanvas(authCtx?.loggedUser, input8);
            setResponse(() => ({
              APIfunction: "getCanvas",
              res: canvas,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="canvas id"
            value={input8}
            onChange={(e) => {
              setInput8(e.target.value);
            }}
          />
          <button className="p-2 bg-amber-900">getCanvas</button>
        </form>
        {/* UPDATE CANVA 9*/}
        <form
          className="ring ring-amber-500 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const updatedCanvas = await updateCanvas(
              authCtx?.loggedUser,
              input9,
              { name: input10, sketch: { [input11]: input12 } }
            );
            setResponse(() => ({
              APIfunction: "updateCanvas",
              res: updatedCanvas,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="canvas id"
            value={input9}
            onChange={(e) => {
              setInput9(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="new Canva name"
            value={input10}
            onChange={(e) => {
              setInput10(e.target.value);
            }}
          />
          <div className=" flex flex-col items-center text-xl">
            <Input
              type="text"
              placeholder="sketch attribute key"
              value={input11}
              onChange={(e) => {
                setInput11(e.target.value);
              }}
            />
            <Input
              type="text"
              placeholder="sketch attribute value"
              value={input12}
              onChange={(e) => {
                setInput12(e.target.value);
              }}
            />
          </div>
          <button className="p-2 bg-amber-900">updateCanvas</button>
        </form>
      </div>

      {/* Start Account Panel */}
      <div className="API/Account bg-pink-400 p-3  gap-3 flex flex-wrap">
        {/* Create User */}
        <form
          className="ring ring-red-600 flex flex-col"
          onSubmit={async (e) => {
            e.preventDefault();
            const registerInfo = {
              displayName: input14,
              email: input15,
              password: input16,
            };
            const userCreated = await createUser(registerInfo);
            setResponse(() => ({
              APIfunction: "createUser",
              res: userCreated,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="new displayName"
            value={input14}
            onChange={(e) => {
              setInput14(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="new email"
            value={input15}
            onChange={(e) => {
              setInput15(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="new password"
            value={input16}
            onChange={(e) => {
              setInput16(e.target.value);
            }}
          />
          <button className="p-2 bg-rose-900">createUser</button>
        </form>
        {/* Log in  User */}
        <form
          className="ring ring-red-600 flex flex-col"
          onSubmit={async (e) => {
            e.preventDefault();
            const loginInfo = {
              email: input17,
              password: input18,
            };
            const loggedUser = await loginUser(loginInfo);
            setResponse(() => ({
              APIfunction: "loginUser",
              res: loggedUser,
            }));
          }}
        >
          <Input
            type="text"
            placeholder="email"
            value={input17}
            onChange={(e) => {
              setInput17(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="password"
            value={input18}
            onChange={(e) => {
              setInput18(e.target.value);
            }}
          />
          <button className="p-2 bg-rose-900">login user</button>
        </form>
      </div>
    </div>
  );
};

export default TesterPage;
