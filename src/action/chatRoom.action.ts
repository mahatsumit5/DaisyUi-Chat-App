import { createRoom, getChatRoom } from "../axios/chatRoom";
import { setAvailableRooms } from "../redux-slice/room.slice";
import { AppDispatch } from "../store";

export const createRoomAction =
  (data: { from: string; to: string }) => async (dispatch: AppDispatch) => {
    const { status } = await createRoom(data);
    status && dispatch(getChatRoomAction());
  };

export const getChatRoomAction = () => async (dispatch: AppDispatch) => {
  const { status, data } = await getChatRoom();
  if (status) {
    dispatch(setAvailableRooms(data));
  }
};
