import { axiosProcessor, rootApi } from "./processor";

export const sendFriendRequest = (data: { userId: string }) => {
  return axiosProcessor({
    method: "post",
    isPrivate: true,
    url: `${rootApi}/api/v1/friend/send-request`,
    obj: data,
  });
};

export const getYourFriendRequest = () => {
  return axiosProcessor({
    method: "get",
    isPrivate: true,
    url: `${rootApi}/api/v1/friend`,
  });
};
export const getYourSentFriendRequest = () => {
  return axiosProcessor({
    method: "get",
    isPrivate: true,
    url: `${rootApi}/api/v1/friend/sent-request`,
  });
};
export const deleteSentRequest = (fromId: string, toId: string) => {
  return axiosProcessor({
    method: "delete",
    isPrivate: true,
    url: `${rootApi}/api/v1/friend/${fromId}/${toId}`,
  });
};
export const acceptFriendReq = (fromId: string, toId: string) => {
  return axiosProcessor({
    method: "patch",
    isPrivate: true,
    url: `${rootApi}/api/v1/friend`,
    obj: { fromId, toId },
  });
};
