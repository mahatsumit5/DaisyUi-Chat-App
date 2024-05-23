import { getMessageByuser, sendMessage } from "../axios/message.axios";
import { setMessages } from "../redux-slice/JoinRoom";
import { AppDispatch } from "../store";

export const getMessageAction =
  (RoomId: string, num: number) => async (dispatch: AppDispatch) => {
    const { status, result } = await getMessageByuser(RoomId, num);
    if (status) {
      dispatch(
        setMessages({
          message: result.messages,
          _count: result._count.messages,
        })
      );
    }
  };

export const postMessageAction =
  ({
    author,
    message,
    roomId,
  }: {
    message: string;
    roomId: string;
    author: string;
  }) =>
  async (dispatch: AppDispatch) => {
    const { status } = await sendMessage({
      content: message,
      roomId,
      author,
    });
    if (status) {
      dispatch(getMessageAction(roomId, 15));
    }
  };
