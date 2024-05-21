import { getMessageByuser, sendMessage } from "../axios/message.axios";
import { setMessages } from "../redux-slice/JoinRoom";
import { AppDispatch } from "../store";

export const getMessageAction =
  (id: string) => async (dispatch: AppDispatch) => {
    const { status, message, result } = await getMessageByuser(id);
    console.log(status, message, result.messages);
    if (status) {
      dispatch(setMessages(result.messages));
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
      dispatch(getMessageAction(roomId));
    }
  };
