import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
const URL = !import.meta.env.PROD
  ? "http://192.168.20.8:8080"
  : import.meta.env.VITE_ROOTSERVER;
export const SocketContext = React.createContext({});

export function SocketProvider({
  email,
  children,
}: {
  email: string;
  children: JSX.Element;
}) {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    console.log(email);
    const newSocket = io(URL, {
      // autoConnect: false,
      query: { email: email },
      transports: ["websocket"],
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [email]);
  return (
    <SocketContext.Provider value={socket as Socket}>
      {children}
    </SocketContext.Provider>
  );
}
