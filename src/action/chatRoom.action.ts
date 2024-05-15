import { createRoom, getChatRoom } from "../axios/chatRoom";
import { setAvailableRooms, setFriends } from "../redux-slice/JoinRoom";
import { AppDispatch } from "../store";
import { IUser } from "../types";
import { getFriendsFromRoom } from "../utils";

export const createRoomAction =
  (data: { from: string; to: string }) => async (dispatch: AppDispatch) => {
    const { status } = await createRoom(data);
    status && dispatch(getChatRoomAction());
  };

export const getChatRoomAction =
  (userId?: string) => async (dispatch: AppDispatch) => {
    const { status, data } = await getChatRoom();
    if (status) {
      dispatch(setAvailableRooms(data));
      dispatch(setFriends(getFriendsFromRoom(data, userId || "") as IUser[]));
    }
  };
