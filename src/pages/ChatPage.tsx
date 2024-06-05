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
        <div className={`${currentRoom?.id ? "" : ""} hidden md:block w-full`}>
          Select a room to chat with the user
        </div>
      )}
    </>
  );
}

export default ChatPage;
