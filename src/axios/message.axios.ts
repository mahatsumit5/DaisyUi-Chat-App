import { axiosProcessor, rootApi } from "./processor";
const url = rootApi + "/api/v1/message";

export const sendMessage = (data: {
  content: string;
  author: string;
  roomId: string;
}) => {
  return axiosProcessor({
    isPrivate: true,
    method: "post",
    url,
    obj: data,
  });
};

export const getMessageByuser = (roomid: string, num: number) => {
  return axiosProcessor({
    isPrivate: true,
    method: "get",
    url: `${url}/${roomid}?num=${num}`,
  });
};
export const getlastMessage = (roomid: string) => {
  return axiosProcessor({
    isPrivate: true,
    method: "get",
    url: url + "/last-message/" + roomid,
  });
};
