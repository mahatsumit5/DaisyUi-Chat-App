import { useEffect } from "react";
import ChatMenu from "../components/ChatMenu";
import Chatbox from "../components/Chatbox";
import { useAppDispatch, useAppSelector } from "../hook";
import { socket } from "../utils/socket";
import { getMessageAction } from "../action/message.action";

function ChatPage() {
  const dispatch = useAppDispatch();
  const { currentRoom } = useAppSelector((store) => store.currentRoom);
  useEffect(() => {
    socket.on("send_message_client", () => {
      dispatch(getMessageAction(currentRoom.id));
    });
  }, [currentRoom.id, dispatch]);
  return (
    <>
      <div
        className={` flex-col gap-2   ${
          currentRoom.id
            ? "hidden md:flex w-[300px]"
            : "flex w-full sm:w-[300px] "
        } `}
      >
        <ChatMenu />
      </div>
      {currentRoom.id ? (
        <div
          className={`${
            currentRoom.id ? "md:block" : "hidden"
          }hidden md:block w-full `}
        >
          <Chatbox />
        </div>
      ) : (
        <div
          className={`$
          {
            currentRoom.id ? "flex" : "hidden md:flex"
          } items-center justify-center`}
        >
          Select room to chat with the user
        </div>
      )}
    </>
  );
}

export default ChatPage;
