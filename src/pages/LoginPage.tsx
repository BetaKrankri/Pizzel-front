import logo from "../assets/pizzel-logo.png";
import Input from "../components/form-components/Input.tsx";

const LoginPage = () => {
  return (
    <div className="LoginPage w-full h-screen flex justify-center ">
      <div className=" w-4/12 flex flex-col items-center py-12 gap-6">
        <img src={logo} alt="logo" className="w-20" />
        <p>Log in to Pizzel</p>
        <form className=" w-full flex flex-col p-6 gap-4 rounded bg-stone-900">
          <Input />
          <button className="rounded w-full p-2 bg-green-600">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
