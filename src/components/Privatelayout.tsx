import { useAppSelector } from "../hook";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import useSocketSetup from "../utils/useSocket";
import { useEffect } from "react";
import NavBar from "./NavBar/NavBar";

function Privatelayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAppSelector((store) => store.user);
  const { socket } = useAppSelector((store) => store.socket);

  useSocketSetup();

  useEffect(() => {
    if (!user?.id) return;
    socket.connect();
    socket.emit("join_your_room", user.id, user.email);
  }, [user, socket]);
  return user?.id ? (
    <div className=" bg-base-300 w-full  h-[100dvh] max-h-[100dvh] overflow-hidden  flex md:px-2 md:py-4 gap-2">
      <div className="h-full bg-base-100 hidden sm:flex  p-4   flex-col justify-between  items-center  min-h-full rounded-lg">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col gap-2 h-full">
        <NavBar />
        {children}
      </div>
    </div>
  ) : (
    <Navigate to={"/"} state={{ from: { location } }} />
  );
}

export default Privatelayout;
