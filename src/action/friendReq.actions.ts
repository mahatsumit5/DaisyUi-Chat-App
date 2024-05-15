import {
  acceptFriendReq,
  deleteSentRequest,
  getYourFriendRequest,
  getYourSentFriendRequest,
  sendFriendRequest,
} from "../axios/friend.axios";
import { setFriendReq, setSentReq } from "../redux-slice/friendReq.slice";
import { AppDispatch } from "../store";
import { createRoomAction } from "./chatRoom.action";

export const getFriendReqAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getYourFriendRequest();
  if (status) {
    dispatch(setFriendReq(result));
  } else {
    dispatch(setFriendReq([]));
  }
};
export const getSentFriendReqAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getYourSentFriendRequest();
  if (status) {
    dispatch(setSentReq(result));
  } else {
    dispatch(setSentReq([]));
  }
};

export const sendFriendReqAction =
  ({ userId }: { userId: string }) =>
  async (dispatch: AppDispatch) => {
    const { status } = await sendFriendRequest({ userId });

    status && dispatch(getSentFriendReqAction());
  };
export const deleteFriendReqAction =
  (from: string, to: string) => async (dispatch: AppDispatch) => {
    const { status } = await deleteSentRequest(from, to);
    if (status) {
      dispatch(getFriendReqAction());
      dispatch(getSentFriendReqAction());
    }
  };
export const acceptFriendReqAction =
  (fromId: string, toId: string) => async (dispatch: AppDispatch) => {
    const { status } = await acceptFriendReq(fromId, toId);

    if (status) {
      dispatch(getFriendReqAction());
      dispatch(createRoomAction({ from: fromId, to: toId }));
    }
  };
