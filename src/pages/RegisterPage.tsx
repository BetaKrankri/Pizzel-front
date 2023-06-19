import { useState } from "react";
import logo from "../assets/pizzel-logo.png";
import Input from "../components/form-components/Input.tsx";

const RegisterPage = () => {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmedPass: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="RegisterPage w-full h-screen flex justify-center ">
      <div className=" w-4/12 flex flex-col items-center py-12 gap-6">
        <img src={logo} alt="logo" className="w-20" />
        <p className="text-xl">Log in to Pizzel</p>
        <form
          onSubmit={handleSubmit}
          className=" w-full flex flex-col p-6 gap-4 rounded bg-stone-900"
        >
          <Input
            type="text"
            label="Display Name"
            placeholder="display name"
            value={form.displayName}
            onChange={(e) => {
              setForm((f) => ({ ...f, displayName: e.target.value }));
            }}
          />
          <Input
            type="email"
            label="Email Address"
            placeholder="email"
            value={form.email}
            onChange={(e) => {
              setForm((f) => ({ ...f, email: e.target.value }));
            }}
          />
          <Input
            type="password"
            label="Password"
            placeholder="password"
            value={form.password}
            onChange={(e) => {
              setForm((f) => ({ ...f, password: e.target.value }));
            }}
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="confirm password"
            value={form.confirmedPass}
            onChange={(e) => {
              setForm((f) => ({ ...f, confirmedPass: e.target.value }));
            }}
          />
          <button className="rounded w-full p-2 bg-green-600 hover:bg-green-700 active:bg-green-500">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
