import { getMessageByuser, sendMessage } from "../axios/message.axios";
import { setCurrentRoom, setMessages } from "../redux/reducer/room.slice";
import { AppDispatch } from "../redux/store";
import { IChatRoom } from "../types";

export const getMessageAction =
  (room: IChatRoom | string, num: number) => async (dispatch: AppDispatch) => {
    const roomId = typeof room === "string" ? room : room.id;

    const { status, result } = await getMessageByuser(roomId, num);
    if (status && typeof room !== "string") {
      dispatch(
        setCurrentRoom({
          ...room,
          messages: result.messages,
          _count: result._count.messages,
        })
      );
    } else {
      dispatch(
        setMessages({
          messages: result.messages,
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
