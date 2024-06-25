import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { setTyping } from "../redux/reducer/socket.slice";
import { setOnlineUsers } from "../redux/reducer/AllUsers.slice";

const useSocketSetup = () => {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector((store) => store.socket);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    socket.on("typing", (email) => {
      dispatch(setTyping({ person: email, typing: true }));
    });
    socket.on("stopped_typing", (email) => {
      dispatch(setTyping({ person: email, typing: false }));
    });
    socket.on("getOnlineUsers", (onlineUsers) => {
      console.log(onlineUsers);
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("disconnect", () => {});
    return () => {
      socket.off("connect_error");
    };
  }, [dispatch, currentRoom?.id, socket]);
};

export default useSocketSetup;
