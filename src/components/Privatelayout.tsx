import { useAppSelector } from "../hook";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar/NavBar";
import { useSocket } from "../hooks/socket.hook";
import { useEffect } from "react";

function Privatelayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAppSelector((store) => store.user);
  const socket = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;
    socket.on("connect_error", (err) => {
      console.log(err.message);
    });
    socket.on("connect", () => {
      console.log("You are connected with id", socket.id);
    });

    socket.on("typing", (email) => {
      dispatch(setTyping({ person: email, typing: true }));
    });
    socket.on("stopped_typing", (email) => {
      dispatch(setTyping({ person: email, typing: false }));
    });
    socket.on("getOnlineUsers", (onlineUsers: string[]) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("disconnect", () => {});
    return () => {
      socket.off("connect_error");
    };
  }, [dispatch, socket]);

  return user?.id ? (
    <div className=" bg-base-300 w-full  h-[100dvh] max-h-[100dvh] overflow-hidden  flex md:px-2 md:py-4 gap-2">
      <div className="h-full bg-base-100 hidden sm:flex  p-4   flex-col justify-between  items-center  min-h-full rounded-lg">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col  h-full">
        <NavBar />
        {children}
      </div>
    </div>
  ) : (
    <Navigate to={"/"} state={{ from: { location } }} />
  );
}

export default Privatelayout;
