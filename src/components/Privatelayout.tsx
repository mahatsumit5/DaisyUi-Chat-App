import { useAppSelector } from "../hook";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

function Privatelayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAppSelector((store) => store.user);
  if (user?.id) {
    return (
      <div className="bg-slate-200 w-full lg:w-[80%] h-[100vh] rounded-md flex px-5 py-5 gap-2">
        <Sidebar />
        <>{children}</>
      </div>
    );
  } else {
    <Navigate to={"/"} state={{ from: { location } }} />;
  }
}

export default Privatelayout;
