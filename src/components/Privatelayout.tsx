import { useAppDispatch, useAppSelector } from "../hook";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar/NavBar";
import { useEffect } from "react";
import { setTyping, socket } from "../redux/reducer/socket.slice";
import { setOnlineUsers } from "../redux/reducer/AllUsers.slice";
import { useGetLoggedInUserQuery } from "../redux";

function Privatelayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useAppSelector((store) => store.comment);
  const location = useLocation();
  const dispatch = useAppDispatch();
  useGetLoggedInUserQuery();

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.log(err);
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
  }, [dispatch]);

  return sessionStorage.getItem("accessJWT") ? (
    <div
      className={` bg-base-200 w-full  min-h-[100dvh]  flex relative mt-14 ${
        isOpen ? "" : ""
      }`}
    >
      <div className="hidden md:block border ">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col md:ml-44 py-2">
        <NavBar />
        {children}
      </div>
    </div>
  ) : (
    <Navigate to={"/"} state={{ from: { location } }} />
  );
}

export default Privatelayout;
