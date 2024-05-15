import { axiosProcessor, rootApi } from "./processor";

export function createRoom(data: { from: string; to: string }) {
  return axiosProcessor({
    method: "post",
    isPrivate: true,
    url: `${rootApi}/api/v1/room`,
    obj: data,
  });
}

export function getChatRoom() {
  return axiosProcessor({
    method: "get",
    isPrivate: true,
    url: `${rootApi}/api/v1/room`,
  });
}
