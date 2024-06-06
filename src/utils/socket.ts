import { io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.DEV
  ? "http://localhost:8080"
  : import.meta.env.VITE_ROOTSERVER;
export const socket = io(URL, {});
