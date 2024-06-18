import { io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object
const URL = !import.meta.env.PROD
  ? "http://192.168.20.8:8080"
  : "https://messenger-j2bf.onrender.com";
export const socket = io(URL, {});
