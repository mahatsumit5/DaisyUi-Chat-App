import { useEffect } from "react";
import { socket } from "./socket";
import { useAppDispatch, useAppSelector } from "../hook";
import { setTyping } from "../redux/reducer/socket.slice";
import { useGetMessagesQuery } from "../redux";

const useSocketSetup = () => {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const dispatch = useAppDispatch();
  const { refetch } = useGetMessagesQuery({
    roomId: currentRoom?.id || "",
    num: 10,
  });

  useEffect(() => {
    // console.log(status, isUninitialized);
    // if (!isUninitialized) {
    //   refetch();
    // }
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
  }, [dispatch, refetch, currentRoom?.id]);
};

export default useSocketSetup;
