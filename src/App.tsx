import { Route, Routes, useLocation } from "react-router-dom"
import { useLoggedInUserQuery } from "./redux/api"
import {
  ChatPage,
  ForgotPassword,
  Friends,
  NotificationPage,
  RequestPage,
  Settings,
  SignIn,
  SignUp,
} from "./pages"
import ProfilePage from "./pages/Profile"
import Privatelayout from "./components/Privatelayout"
import { Dialog, Loading, Toast } from "./components"
import { useEffect } from "react"
import { useAppDispatch } from "./hooks/hook"
import PageNotFound from "./components/PageNotFound"
import Home from "./pages/Home"
import HomeMessageBox from "./components/HomeMessageBoc/HomeMessageBox"
import { userGraphqlApi } from "./graphql/api/userGraphql.api"
import ViewImg from "./components/post/ViewImg"
export default function App() {
  useLoggedInUserQuery(
    {},
    {
      pollingInterval: 5 * 60 * 1000, // 5 minutes
    }
  )
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/sign-up") return
    dispatch(userGraphqlApi.endpoints.LoggedInUser.initiate())
  }, [location, dispatch])

  return (
    <div
      className=" bg-base-300  font-poppins"
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
              <RequestPage />
            </Privatelayout>
          }
        />
        <Route
          path="/notification"
          element={
            <Privatelayout>
              <NotificationPage />
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
      <HomeMessageBox />
      <ViewImg />
    </div>
  )
}
