import { useState } from "react";
import { useAppSelector } from "../hook";
import MessageBox from "./messages/MessageBox";
import MessageHeader from "./messages/MessageHeader";
import MessageInput from "./messages/MessageInput";
import Profile from "./messages/Profile";
function Chatbox() {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { user } = useAppSelector((store) => store.user);

  const [component, setComponent] = useState<"message" | "profile">("message");
  const displayComponent = {
    message: currentRoom?.id ? (
      <MessageBox userId={user?.id as string} />
    ) : null,

    profile: <Profile setComponent={setComponent} type="friend" />,
  };
  return currentRoom?.id ? (
    <div className="flex flex-col gap-2 w-full h-full">
      <MessageHeader currentRoom={currentRoom} setComponent={setComponent} />
      {displayComponent[component]}
      <MessageInput
        id={currentRoom.id}
        userId={user?.id as string}
        email={user?.email || ""}
      />
    </div>
  ) : null;
}

export default Chatbox;
