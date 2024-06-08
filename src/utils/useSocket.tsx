import { useEffect } from "react";
import { socket } from "./socket";
import { useAppDispatch, useAppSelector } from "../hook";
import { setTyping } from "../redux/reducer/socket.slice";
import { setOnlineUsers } from "../redux/reducer/AllUsers.slice";

const useSocketSetup = () => {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    socket.on("typing", (email) => {
      dispatch(setTyping({ person: email, typing: true }));
    });
    socket.on("stopped_typing", (email) => {
      dispatch(setTyping({ person: email, typing: false }));
    });
    socket.on("online_users", (email: string) => {
      console.log(email);
      dispatch(setOnlineUsers(email));
    });
    socket.on("receive_friend_request", (sender) =>
      console.log("You have a new request from:", sender)
    );

    socket.on("disconnect", (reason) => {
      console.log({ reason });
    });
    return () => {
      socket.off("connect_error");
    };
  }, [dispatch, currentRoom?.id]);
};

export default useSocketSetup;
