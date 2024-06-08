import { useAppSelector } from "../hook";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import useSocketSetup from "../utils/useSocket";

function Privatelayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAppSelector((store) => store.user);

  useSocketSetup();

  return user?.id ? (
    <div className="bg-slate-200 w-full  h-[100dvh] rounded-md flex px-2 py-5 gap-2">
      <div className="h-full hidden sm:flex bg-slate-900 p-4 text-white  flex-col justify-between  items-center  min-h-full rounded-lg">
        <Sidebar />
      </div>
      <>{children}</>
    </div>
  ) : (
    <Navigate to={"/"} state={{ from: { location } }} />
  );
}

export default Privatelayout;
