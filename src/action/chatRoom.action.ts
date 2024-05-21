import { createRoom, getChatRoom } from "../axios/chatRoom";
import { setAvailableRooms } from "../redux-slice/JoinRoom";
import { AppDispatch } from "../store";

export const createRoomAction =
  (data: { from: string; to: string }) => async (dispatch: AppDispatch) => {
    const { status } = await createRoom(data);
    status && dispatch(getChatRoomAction());
  };

export const getChatRoomAction = () => async (dispatch: AppDispatch) => {
  const { status, data } = await getChatRoom();
  if (status) {
    console.log(data);
    dispatch(setAvailableRooms(data));
  }
};
