import { Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/Sign-in";
import { SignUp } from "./pages/SignUp";
import ChatPage from "./pages/ChatPage";
import ForgotPassword from "./pages/ForgotPassword";
import Privatelayout from "./components/Privatelayout";

// import { autoLogin } from "./action/user.action";
import Friends from "./pages/Friends";

import Notification from "./pages/Notification";
import Dialog from "./components/modal/Dialog";
import ProfilePage from "./pages/Profile";
import {
  useGetLoggedInUserQuery,
  useGetNewAccessJWTMutation,
} from "./redux-slice/api";
import { useEffect } from "react";
import { useAppDispatch } from "./hook";
import { setUser } from "./redux-slice/user.slice";

export default function App() {
  const dispatch = useAppDispatch();
  const { data, error } = useGetLoggedInUserQuery();
  const [getNewAccessJWT] = useGetNewAccessJWTMutation();

  useEffect(() => {
    if (error) {
      getNewAccessJWT()
        .unwrap()
        .then((res) => {
          sessionStorage.setItem("accessJWT", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (data) {
      dispatch(setUser(data));
    }
  }, [error, data, dispatch, getNewAccessJWT]);
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
          <Route
            path="/profile"
            element={
              <Privatelayout>
                <ProfilePage />
              </Privatelayout>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Dialog />
      </div>
    </>
  );
}
