import { useEffect } from "react";
import { socket } from "./socket";
import { useAppDispatch, useAppSelector } from "../hook";
import { setTyping } from "../redux/reducer/socket.slice";

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

    return () => {
      socket.off("connect_error");
    };
  }, [dispatch, currentRoom?.id]);
};

export default useSocketSetup;
