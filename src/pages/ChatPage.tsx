import { Link } from "react-router-dom";

import { useAppSelector } from "../hook";
import { ChatBox, ChatMenu } from "../components";

function ChatPage() {
  const { currentRoom } = useAppSelector((store) => store.rooms);

  return (
    <div className="flex  gap-1 flex-1 relative">
      <div
        className={`  md:fixed md:top-14 h-full  ${
          currentRoom?.id ? "hidden lg:flex " : "flex w-full  "
        } `}
      >
        <ChatMenu />
      </div>

      {currentRoom?.id ? (
        <div
          className={` ${
            currentRoom?.id
              ? "w-full md:ml-[350px] fixed top-0 md:static  "
              : ""
          }  `}
        >
          <ChatBox />
        </div>
      ) : (
        <div
          className={` hidden md:flex w-full flex-col justify-center items-center gap-2 `}
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
  );
}

export default ChatPage;
