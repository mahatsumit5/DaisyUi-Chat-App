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
import { socket } from "./socket";
import {
  getFriendReqAction,
  getSentFriendReqAction,
} from "./action/friendReq.actions";
import { getChatRoomAction } from "./action/chatRoom.action";
import Login from "./pages/Login";

export default function App() {
  useEffect(() => {
    socket.on("connect", () => {});
  }, []);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user.id) return;
    dispatch(autoLogin());
    dispatch(getAllUsersAction());
    dispatch(getFriendReqAction());
    dispatch(getSentFriendReqAction());
    dispatch(getChatRoomAction(user.id));
  }, [dispatch, user]);
  return (
    <>
      <div className=" bg-slate-900 flex justify-center items-center ">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </>
  );
}
