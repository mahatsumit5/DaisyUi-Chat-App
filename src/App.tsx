import { Route, Routes } from "react-router-dom";

import { SignIn } from "./pages/Sign-in";
import { SignUp } from "./pages/SignUp";
import ChatPage from "./pages/ChatPage";
import ForgotPassword from "./pages/ForgotPassword";
import Privatelayout from "./components/Privatelayout";

export default function App() {
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
