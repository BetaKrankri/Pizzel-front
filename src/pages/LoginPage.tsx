import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/pizzel-logo.png";
import Input from "../components/form-components/Input";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { loginUser } from "../utils/api";

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
        // localStorage.setItem("loggedUser", JSON.stringify(newLoggedUser));
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
      <div className="Wrapper flex flex-col items-center py-16 gap-6 w-11/12 max-w-lg">
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
          <div />
          <button className="rounded w-full p-2 bg-green-600 hover:bg-green-700 active:bg-green-500">
            Log In
          </button>
        </form>
        <div
          className={`bg-red-600 rounded flex justify-between w-full border-4 border-red-400 text-sm text-red-50 transition-all ${
            !error && "w-0 h-0 border-0 overflow-hidden p-0"
          } ${error && "p-1 px-2"}`}
        >
          {error}
          <button
            className={`w-4 h-4 grid place-items-center`}
            onClick={() => setError("")}
          >
            x
          </button>
        </div>
        {/* TODO:  Agregar Redux */}
        <p>
          You don't have an Account?{" "}
          <Link to="/signup" className=" font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
