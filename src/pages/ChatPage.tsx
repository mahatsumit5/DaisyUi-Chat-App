import { Link } from "react-router-dom";

import { useAppSelector } from "../hook";
import { ChatBox, ChatMenu } from "../components";

function ChatPage() {
  const { currentRoom } = useAppSelector((store) => store.rooms);

  return (
    <div className="flex  relative border shadow-lg  h-full">
      <div
        className={`   h-full  ${
          currentRoom?.id ? "hidden lg:flex " : "flex w-full overflow-y-scroll "
        } `}
      >
        <ChatMenu />
      </div>

      {currentRoom?.id ? (
        <div
          className={` ${
            currentRoom?.id ? "w-full  fixed top-0 md:static  " : ""
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
