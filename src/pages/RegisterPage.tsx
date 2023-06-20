import logo from "../assets/pizzel-logo.png";
import Input from "../components/form-components/Input.tsx";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";

interface FormData {
  displayName: string;
  email: string;
  password: string;
  confirmedPass: string;
}

const initialForm = {
  displayName: "",
  email: "",
  password: "",
  confirmedPass: "",
};

const RegisterPage = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let verifError = "";
    if (form.confirmedPass !== form.password)
      verifError = "The confirmation password is not the same";
    if (form.password.length < 8)
      verifError = "Password must be larger than 8 letters";
    if (!Object.values(form).every((inpVal) => inpVal))
      verifError = "All fields are required";
    setError(verifError);
  }, [form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendRegisterData = async () => {
      const userToken = await axios
        .post("http://localhost:3000/user", {
          name: form.displayName,
          email: form.email,
          password: form.confirmedPass,
        })
        .then((res) => res.data.token)
        .catch((err) => setError(err.message))
        .then(() => setForm(initialForm));
      // TODO: Pasarlo al Contexto de la App

      console.log(userToken);
    };

    !error && sendRegisterData();
  };

  return (
    <div className="RegisterPage w-full h-screen flex justify-center ">
      <div className="Wrapper w-4/12 flex flex-col items-center py-12 gap-6 relative">
        <img src={logo} alt="logo" className="w-20" />
        <p className="text-xl">Log in to Pizzel</p>
        <form
          onSubmit={handleSubmit}
          className=" w-full flex flex-col p-6 gap-4 rounded bg-stone-900 "
        >
          <Input
            type="text"
            label="Display Name"
            placeholder="display name"
            autocomplete="username"
            value={form.displayName}
            onChange={(e) => {
              setForm((f) => ({ ...f, displayName: e.target.value }));
            }}
          />
          <Input
            type="email"
            label="Email Address"
            placeholder="email"
            autocomplete="email"
            value={form.email}
            onChange={(e) => {
              setForm((f) => ({ ...f, email: e.target.value }));
            }}
          />
          <Input
            type="password"
            label="Password"
            placeholder="password"
            autocomplete="new-password"
            value={form.password}
            onChange={(e) => {
              setForm((f) => ({ ...f, password: e.target.value }));
            }}
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="confirm password"
            autocomplete="new-password"
            value={form.confirmedPass}
            onChange={(e) => {
              setForm((f) => ({ ...f, confirmedPass: e.target.value }));
            }}
          />
          <button className="rounded w-full p-2 bg-green-600 hover:bg-green-700 active:bg-green-500">
            Sign Up
          </button>
        </form>

        <div
          className={`bg-red-600 ring-red-500  text-white text-sm whitespace-nowrap rounded ${
            error ? "w-full p-2 ring" : "w-0 p-0"
          } overflow-hidden transition-all relative -top-3 flex items-center`}
        >
          <p className="w-full">{error}</p>
          <button className="" onClick={() => setError("")}>
            x
          </button>
        </div>
        {/* TODO:  Agregar Redux */}
        <p>
          You already have an Account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
