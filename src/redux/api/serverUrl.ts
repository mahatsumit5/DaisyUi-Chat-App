export const rootApi = !import.meta.env.PROD
  ? "http://192.168.20.8:8080/"
  : import.meta.env.VITE_ROOTSERVER;

export const userApiUrl = rootApi + "api/v1/user";
export const friendApiUrl = rootApi + "api/v1/friend";
export const roomApiUrl = rootApi + "api/v1/room";
export const messageApiUrl = rootApi + "api/v1/message";
