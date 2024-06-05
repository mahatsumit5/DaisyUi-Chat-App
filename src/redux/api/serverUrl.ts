export const rootApi = import.meta.env.PROD
  ? "http://localhost:8080"
  : "https://messenger-j2bf.onrender.com";
console.log(rootApi);
export const userApiUrl = rootApi + "/api/v1/user";
export const friendApiUrl = rootApi + "/api/v1/friend";
export const roomApiUrl = rootApi + "/api/v1/room";
export const messageApiUrl = rootApi + "/api/v1/message";