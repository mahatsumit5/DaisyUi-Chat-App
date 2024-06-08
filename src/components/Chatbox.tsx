import { useState } from "react";
import { useAppSelector } from "../hook";
import MessageBox from "./messages/MessageBox";
import MessageHeader from "./messages/MessageHeader";
import MessageInput from "./messages/MessageInput";
import Profile from "./messages/Profile";
function Chatbox() {
  const [message, setMessage] = useState<string>("");

  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { user } = useAppSelector((store) => store.user);
  const [status, setStatus] = useState<{
    isLoading: boolean;
    isError: boolean;
  }>({ isError: false, isLoading: false });
  const [component, setComponent] = useState<"message" | "profile">("message");
  const displayComponent = {
    message: currentRoom?.id ? (
      <MessageBox
        message={message}
        userId={user?.id as string}
        isError={status.isError}
        isSendingMessageLoading={status.isLoading}
      />
    ) : null,

    profile: <Profile setComponent={setComponent} type="friend" />,
  };
  return currentRoom?.id ? (
    <div className="flex flex-col gap-2 w-full h-full">
      <MessageHeader currentRoom={currentRoom} setComponent={setComponent} />
      {displayComponent[component]}
      <MessageInput
        message={message}
        setStatus={setStatus}
        id={currentRoom.id}
        userId={user?.id as string}
        email={user?.email || ""}
        setMessage={setMessage}
      />
    </div>
  ) : null;
}

export default Chatbox;
