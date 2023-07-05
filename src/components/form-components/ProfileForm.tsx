import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function ProfileForm() {
  const authCtx = useContext(AuthContext);

  const canvasCount = authCtx?.loggedUser.portfolios?.reduce(
    (acc, cur) => acc + (cur.canvases?.length || 0),
    0
  );

  return (
    <div className="ProfileForm bg-slate-800 w-full h-full flex flex-col gap-3 px-3 py-5 transition-all duration-500">
      <div className="px-1">
        <h1 className="text-4xl font-poppins font-light">Profile</h1>
      </div>
      <hr />
      <div className="Wrapper max-h-96 flex flex-col gap-4 px-6 py-4">
        <div className="Avatar rounded-full w-14 h-14 bg-amber-600 ring ring-slate-950"></div>
        {authCtx?.loggedUser.displayName && (
          <div className="font-jost flex flex-col gap-2">
            <p>Display Name:</p>
            <p className="text-2xl pl-4">{authCtx?.loggedUser.displayName}</p>
          </div>
        )}
        <div className="font-jost flex flex-col gap-1">
          <p>Email:</p>
          <p className="text-2xl pl-4">{authCtx?.loggedUser.email}</p>
        </div>
        <div className="font-jost flex flex-col gap-1">
          <p>Canvas count:</p>
          <p className="text-2xl pl-4">{canvasCount}</p>
        </div>
      </div>

      <button
        className="self-end rounded w-fit p-3 text-xl bg-slate-950 border border-slate-950 hover:bg-amber-950"
        onClick={() => {
          localStorage.removeItem("loggedUser");
          authCtx?.updateLoggedUser(() => ({ token: "" }));
        }}
        // TODO: Mandar una alerta para confirmar 'Cerrar sesion'
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileForm;
