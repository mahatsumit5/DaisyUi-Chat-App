import { Route, Routes, useNavigate } from "react-router-dom";

import { useGetLoggedInUserQuery, useGetNewAccessJWTMutation } from "./redux";
import { useEffect } from "react";
import { setUser } from "./redux/reducer/user.slice";
import { useAppDispatch } from "./hook";
import { IUser } from "./types";

import {
  ChatPage,
  ForgotPassword,
  Friends,
  Notification,
  Request,
  Settings,
  SignIn,
  SignUp,
} from "./pages";
import ProfilePage from "./pages/Profile";
import Privatelayout from "./components/Privatelayout";
import { Dialog, Loading, Toast } from "./components";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, isFetching, refetch, data } = useGetLoggedInUserQuery();
  const [getNewAccessJWT] = useGetNewAccessJWTMutation();

  useEffect(() => {
    if (isFetching) return;
    error
      ? getNewAccessJWT()
          .unwrap()
          .then((res) => {
            sessionStorage.setItem("accessJWT", res.data as string);
            refetch();
          })
      : dispatch(setUser(data as IUser));
  }, [isFetching, error, getNewAccessJWT, navigate, data, refetch, dispatch]);

  return (
    <>
      <div
        className=" bg-slate-900 flex justify-center items-center "
        data-theme={localStorage.getItem("theme") || "winter"}
      >
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
            path="/settings"
            element={
              <Privatelayout>
                <Settings />
              </Privatelayout>
            }
          />

          <Route
            path="/friend-request"
            element={
              <Privatelayout>
                <Request />
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
        <Loading />
        <Toast />
      </div>
    </>
  );
}
