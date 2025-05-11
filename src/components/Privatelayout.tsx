import { useAppDispatch } from "../hooks/hook"
import { Navigate, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import NavBar from "./NavBar/NavBar"
import React from "react"
import { toggleDialog } from "../redux/reducer/dialog.slice"
import useSubscriptionHook from "../hooks/useSubscription.hook"
import {
  LIST_OF_ONLINE_USERS,
  SUBS_TO_YOUR_MESSAGE,
} from "../graphql/subscriptions/newMessageReceived"
import { setOnlineUsers } from "../redux/reducer/AllUsers.slice"
import { User } from "../types/types"

function Privatelayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const dispatch = useAppDispatch()
  useSubscriptionHook(SUBS_TO_YOUR_MESSAGE, {
    variables: {
      yourUserId: JSON.parse(sessionStorage.getItem("userId") as string),
    },
    onData: () => {
      dispatch(
        toggleDialog({
          content: "You  have a new message",
          heading: "New Message",
          type: "request",
        })
      )
    },
  })

  useSubscriptionHook(LIST_OF_ONLINE_USERS, {
    onData(options) {
      console.log(options.data.data.onlineUsers)
      dispatch(
        setOnlineUsers(
          options.data.data.onlineUsers.map((user: User) => user.id)
        )
      )
    },
    onError(error) {
      console.log("error", error)
      dispatch(setOnlineUsers())
    },
  })

  return sessionStorage.getItem("accessJWT") ? (
    <div className={`${location.pathname !== "chat" ? "min-h-screen" : ""} `}>
      <NavBar />

      <div
        className={` w-full flex h-full overflow-y-auto max-w-6xl mx-auto mt-2  relative   `}
      >
        <div className="hidden md:block  bg-base-100 border-2 rounded-md w-[200px] fixed ">
          <Sidebar />
        </div>
        <div className="w-full   md:ml-[210px] relative ">{children}</div>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} state={{ from: { location } }} />
  )
}

export default Privatelayout
