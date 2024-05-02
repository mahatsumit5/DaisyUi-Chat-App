import axios from "axios";
export const rootApi = !import.meta.env.PROD
  ? "http://localhost:8080"
  : "your server domain";

type config = {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  obj?: object;
  isPrivate: boolean;
  refreshToken?: boolean;
};
export const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};
export const getRefreshJWT = () => {
  return sessionStorage.getItem("refreshJWT");
};

export async function axiosProcessor(config: config) {
  const { isPrivate, method, obj, url, refreshToken } = config;
  const token = refreshToken ? getRefreshJWT() : getAccessJWT();
  const headers = {
    Authorization: isPrivate ? token : undefined,
  };
  try {
    const { data } = await axios({
      method,
      url,
      data: obj,
      headers,
    });
    return data;
  } catch (error) {
    return error?.response.data;
  }
}
