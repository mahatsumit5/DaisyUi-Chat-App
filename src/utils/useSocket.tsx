import { useEffect } from "react";
import { socket } from "./socket";

const useSocketSetup = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    return () => {
      socket.off("connect_error");
    };
  }, []);
};

export default useSocketSetup;
