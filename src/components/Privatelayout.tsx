import { useAppDispatch } from "../hook";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar/NavBar";
import { useEffect } from "react";
import { setTyping, socket } from "../redux/reducer/socket.slice";
import { setOnlineUsers } from "../redux/reducer/AllUsers.slice";
import { useGetLoggedInUserQuery } from "../redux";
import { toggleDialog } from "../redux/reducer/dialog.slice";

function Privatelayout({ children }: { children: React.ReactNode }) {
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
    socket.on("getLikedNotification", (data) => {
      console.log(
        "user with id",
        data.userId,
        "liked your post with id",
        data.postId
      );

      dispatch(
        toggleDialog({
          content: "someone liked your post",
          heading: "notification",
          type: "request",
        })
      );
    });

    socket.on("disconnect", () => {});
    return () => {
      socket.off("connect_error");
    };
  }, [dispatch]);

  return sessionStorage.getItem("accessJWT") ? (
    <div
      className={` bg-base-100 w-full min-h-[100dvh] h-full  flex relative overflow-y-auto `}
    >
      <NavBar />
      <div className="hidden md:block  mt-14">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col md:ml-44 py-2 mt-14 border-x-2 bg-base-300/50">
        {children}
      </div>
    </div>
  ) : (
    <Navigate to={"/"} state={{ from: { location } }} />
  );
}

export default Privatelayout;
