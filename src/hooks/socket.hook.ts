import { useContext } from "react";
import { SocketContext } from "../contexts/SocketProvider";
import { Socket } from "socket.io-client";

export const useSocket = () => {
  const socket = useContext(SocketContext) as Socket;
  // const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  // useEffect(() => {
  //   if (socket) {
  //     setSocketInstance(socket);
  //   } else {
  //     throw new Error("No Socket Context Found");
  //   }
  // }, [socket]);

  // if (!socketInstance) {
  //   return;
  // }

  // return socketInstance;

  return socket;
};
