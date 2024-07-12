import { Link } from "react-router-dom";

import { useAppSelector } from "../hook";
import { ChatBox, ChatMenu } from "../components";

function ChatPage() {
  const { currentRoom } = useAppSelector((store) => store.rooms);

  return (
    <div className="flex  gap-1 flex-1">
      <div
        className={`    ${
          currentRoom?.id ? "hidden lg:flex " : "flex w-full  "
        } `}
      >
        <ChatMenu />
      </div>

      {currentRoom?.id ? (
        <div className={` ${currentRoom?.id ? "w-full" : ""}  `}>
          <ChatBox />
        </div>
      ) : (
        <div
          className={` hidden md:flex w-full flex-col justify-center items-center gap-5`}
        >
          <p className="text-2xl">Select a Room</p>
          <p>or</p>
          <Link to={"/friends"}>
            <button className="btn btn-primary text-white">
              Find New People
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
