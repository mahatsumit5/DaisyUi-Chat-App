import { Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/Sign-in";
import { SignUp } from "./pages/SignUp";
import ChatPage from "./pages/ChatPage";
import ForgotPassword from "./pages/ForgotPassword";
import Privatelayout from "./components/Privatelayout";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import { autoLogin, getAllUsersAction } from "./action/user.action";
import Friends from "./pages/Friends";
import {
  getFriendReqAction,
  getSentFriendReqAction,
} from "./action/friendReq.actions";
import { getChatRoomAction } from "./action/chatRoom.action";
import Notification from "./pages/Notification";

export default function App() {
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user?.id) return;
    dispatch(autoLogin());
    dispatch(getAllUsersAction());
    dispatch(getFriendReqAction());
    dispatch(getSentFriendReqAction());
    dispatch(getChatRoomAction());
  }, [dispatch, user]);
  return (
    <>
      <div className=" bg-slate-900 flex justify-center items-center ">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/chat"
            element={
              <Privatelayout>
                <ChatPage />
              </Privatelayout>
            }
          />
          <Route
            path="/friends"
            element={
              <Privatelayout>
                <Friends />
              </Privatelayout>
            }
          />
          <Route
            path="/notification"
            element={
              <Privatelayout>
                <Notification />
              </Privatelayout>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </>
  );
}
