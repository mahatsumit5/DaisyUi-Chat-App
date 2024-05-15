import { IChatRoom } from "../types";

export function getFriendsFromRoom(arrayData: IChatRoom[], userID: string) {
  return arrayData.map((item) => {
    return item.user.find((item) => item.id !== userID);
  });
}
