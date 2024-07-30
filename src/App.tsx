import { Route, Routes, useLocation } from "react-router-dom";

import { userApi } from "./redux";

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
import { useEffect } from "react";
import { useAppDispatch } from "./hook";
import PageNotFound from "./components/PageNotFound";
import { SocketProvider } from "./contexts/SocketProvider";
import Home from "./pages/Home";
import CommentDialog from "./components/post/CommentDialog";

export default function App() {
  const location = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/sign-up") return;
    dispatch(userApi.endpoints.getLoggedInUser.initiate());
  }, [location, dispatch]);

  return (
    <SocketProvider email={JSON.stringify(sessionStorage.getItem("email"))}>
      <div
        className=" flex justify-center items-center "
        data-theme={localStorage.getItem("theme") || "light"}
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
            path="/home"
            element={
              <Privatelayout>
                <Home />
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
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Dialog />
        <Loading />
        <Toast />
        <CommentDialog />
      </div>
    </SocketProvider>
  );
}
