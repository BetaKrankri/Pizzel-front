import logo from "../assets/pizzel-logo-error.png";

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-screen">
      <img src={logo} alt={"logo"} className="w-20" />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has ocurred</p>
    </div>
  );
};

export default ErrorPage;
