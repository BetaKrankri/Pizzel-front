import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/pizzel-logo.png";
import Input from "../components/form-components/Input.tsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { loginUser } from "../utils/api.tsx";

interface FormData {
  email: string;
  password: string;
}

const initialForm = { email: "", password: "" };

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [error, setError] = useState<string>("");

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx?.loggedUser.token && localStorage.getItem("loggedUser")) {
      navigate("/editor");
    }
  }, [authCtx?.loggedUser, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendLoginData = async () => {
      try {
        const newLoggedUser = await loginUser(form);
        newLoggedUser.email = form.email;
        authCtx?.updateLoggedUser(newLoggedUser);
        localStorage.setItem("loggedUser", JSON.stringify(newLoggedUser));
        // console.log(newLoggedUser);
        navigate("/editor");
      } catch (error) {
        console.error(error);
        setError(error?.data || error?.message);
        setTimeout(() => setError(""), 3000);
      }
    };

    if (Object.values(form).every((inpVal) => inpVal) && !error) {
      sendLoginData();
    }
  };

  return (
    <div className="LoginPage w-full h-screen flex justify-center ">
      <div className="Wrapper max-w-lg w-4/12 flex flex-col items-center py-12 gap-6">
        <img src={logo} alt="logo" className="w-20" />
        <p className="text-xl">Log in to Pizzel</p>
        <form
          onSubmit={handleSubmit}
          className=" w-full flex flex-col p-6 gap-4 rounded bg-stone-900"
        >
          <Input
            type="email"
            label="Email Address"
            placeholder="email"
            autocomplete="username"
            value={form.email}
            onChange={(e) => {
              setForm((f) => ({ ...f, email: e.target.value }));
            }}
          />
          <Input
            type="password"
            label="Password"
            placeholder="password"
            autocomplete="current-password"
            value={form.password}
            onChange={(e) => {
              setForm((f) => ({ ...f, password: e.target.value }));
            }}
          />
          <button className="rounded w-full p-2 bg-green-600 hover:bg-green-700 active:bg-green-500">
            Log In
          </button>
        </form>
        <div
          className={`bg-red-600 ring-red-500  text-white text-sm whitespace-nowrap rounded ${
            error ? "w-full p-2 ring block" : "w-0 p-0 hidden"
          } overflow-hidden transition-all relative -top-3 flex items-center`}
        >
          <p className="w-full">{error}</p>
          <button className="" onClick={() => setError("")}>
            x
          </button>
        </div>
        {/* TODO:  Agregar Redux */}
        <p>
          You don't have an Account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
