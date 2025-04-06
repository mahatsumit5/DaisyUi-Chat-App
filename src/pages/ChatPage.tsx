import { Link } from "react-router-dom"

import { useAppSelector } from "../hooks/hook"
import { ChatBox, ChatMenu } from "../components"

function ChatPage() {
  const { currentRoom } = useAppSelector(store => store.rooms)

  return (
    <div className="flex  gap-1 h-[90dvh]  ">
      <ChatMenu />

      {currentRoom?.id ? (
        <div
          className={` h-full ${
            currentRoom?.id ? "w-full  fixed top-0 md:static  " : ""
          }  `}
        >
          <ChatBox />
        </div>
      ) : (
        <div
          className={` hidden md:flex w-full flex-col justify-center items-center gap-2  rounded-md bg-base-100 `}
        >
          <p className="text-2xl">Select a Room</p>
          <p>or</p>
          <Link to={"/friends"}>
            <button className="btn btn-primary btn-outline" type="button">
              Find New People
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ChatPage
