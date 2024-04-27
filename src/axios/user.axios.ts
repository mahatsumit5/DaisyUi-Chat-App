import { axiosProcessor, rootApi } from "./processor";
const url = rootApi + "/api/v1/user";
export const loginUser = async (form: { email: string; password: string }) => {
  return axiosProcessor({
    isPrivate: false,
    url,
    method: "post",
    obj: form,
  });
};

export const getUser = async () => {
  return axiosProcessor({
    method: "get",
    isPrivate: true,
    url,
  });
};

export const signUpUser = async (form: object) => {
  return axiosProcessor({
    isPrivate: false,
    method: "post",
    obj: form,
    url: `${url}/sign-up`,
  });
};
