import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CanvasButton from "./CanvasButton";

const N_LAST_RECENTS = 5;

const RecentsForm: React.FC = () => {
  const authCtx = useContext(AuthContext);

  ///// Obtiene los ultimos canvases usando la informacion del contexto
  const usersPortfolios = authCtx?.loggedUser.portfolios;
  const allCanvases = usersPortfolios
    ?.map((portfolio) => portfolio.canvases)
    .flat();
  allCanvases?.sort((ca, cb) => {
    const dateA = new Date(ca.updatedAt);
    const dateB = new Date(cb.updatedAt);
    return dateB.getTime() - dateA.getTime();
  });
  const lastCvs = allCanvases?.splice(0, N_LAST_RECENTS);

  return (
    <div className="RecentsForm bg-slate-800 w-full h-full flex flex-col gap-3 p-3 transition-all duration-500">
      <div className="px-1">
        <h1 className="text-4xl font-poppins font-light">Last edited</h1>
      </div>
      <hr />
      <div
        className={`Wrapper w-80 max-h-96 min-h-[200px] overflow-auto
       scrollbar-hide scroll-smooth flex flex-col gap-3 shadow`}
      >
        {lastCvs?.map((canvas) => (
          <CanvasButton canvas={canvas} key={canvas.id} />
        ))}
      </div>
    </div>
  );
};

export default RecentsForm;
/*
   ///// Obtiene los ultimos canvases usando la funcion del servidor y la almacena en un estado. 
   
   
    const [lastCanvases, setLastCanvases] = useState<Canvas[]>([]);
    useEffect(() => {
      const searchLastCanvases = async () => {
        const usersCanvases = await getAllCanvases(authCtx?.loggedUser);
        usersCanvases.sort((ca, cb) => {
          const dateA = new Date(ca.updatedAt);
          const dateB = new Date(cb.updatedAt);
          return dateB.getTime() - dateA.getTime();
        });
        const lastCvs = usersCanvases.splice(0, N_LAST_RECENTS);
        setLastCanvases(() => lastCvs);
      };
      searchLastCanvases();
    }, []);
    

*/
