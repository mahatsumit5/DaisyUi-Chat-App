import { Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/Sign-in";
import { SignUp } from "./pages/SignUp";
import ChatPage from "./pages/ChatPage";
import ForgotPassword from "./pages/ForgotPassword";
import Privatelayout from "./components/Privatelayout";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import { autoLogin } from "./action/user.action";

export default function App() {
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user.id) return;
    dispatch(autoLogin());
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </>
  );
}
