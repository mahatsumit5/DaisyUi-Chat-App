import { io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object
const URL = !import.meta.env.PROD
  ? "http://localhost:8080"
  : "https://messenger-j2bf.onrender.com";
console.log(URL);
export const socket = io(URL, {});
