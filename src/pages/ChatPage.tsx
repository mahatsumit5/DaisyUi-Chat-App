import { Link } from "react-router-dom";
import ChatMenu from "../components/ChatMenu";
import Chatbox from "../components/Chatbox";
import { useAppSelector } from "../hook";

function ChatPage() {
  const { currentRoom } = useAppSelector((store) => store.rooms);

  return (
    <div className="flex h-full gap-2">
      <div
        className={`    ${
          currentRoom?.id ? "hidden lg:flex " : "flex w-full  "
        } `}
      >
        <ChatMenu />
      </div>

      {currentRoom?.id ? (
        <div className={` ${currentRoom?.id ? "w-full" : ""}  `}>
          <Chatbox />
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
