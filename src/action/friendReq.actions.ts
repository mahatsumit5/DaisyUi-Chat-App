import {
  deleteSentRequest,
  getYourFriendRequest,
  getYourSentFriendRequest,
  sendFriendRequest,
} from "../axios/friend.axios";
import { setFriendReq, setSentReq } from "../redux-slice/friendReq.slice";
import { AppDispatch } from "../store";

export const getFriendReqAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getYourFriendRequest();
  status && dispatch(setFriendReq(result));
};
export const getSentFriendReqAction = () => async (dispatch: AppDispatch) => {
  const { status, result } = await getYourSentFriendRequest();
  status && dispatch(setSentReq(result));
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
      dispatch(getSentFriendReqAction());
    }
  };
