import { Link } from "react-router-dom";
import ChatMenu from "../components/ChatMenu";
import Chatbox from "../components/Chatbox";
import { useAppSelector } from "../hook";

function ChatPage() {
  const { currentRoom } = useAppSelector((store) => store.rooms);

  return (
    <>
      <div
        className={` flex-col gap-2   ${
          currentRoom?.id ? "hidden md:flex w-[300px]" : "flex w-full  "
        } `}
      >
        <ChatMenu />
      </div>

      {currentRoom?.id ? (
        <div
          className={`  ${
            currentRoom?.id ? "md:block" : "hidden"
          }hidden md:block w-full `}
        >
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
    </>
  );
}

export default ChatPage;
//
