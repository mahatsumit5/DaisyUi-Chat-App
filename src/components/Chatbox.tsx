import { useAppSelector } from "../hook";
import MessageBox from "./messages/MessageBox";
import MessageHeader from "./messages/MessageHeader";
import MessageInput from "./messages/MessageInput";
function Chatbox() {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { user } = useAppSelector((store) => store.user);

  return currentRoom?.id ? (
    <div className="flex flex-col  w-full h-full    relative gap-2 bg-base-100 relative">
      <MessageHeader currentRoom={currentRoom} />
      <MessageBox
        userId={user?.id as string}
        userName={user?.fName as string}
      />
      <MessageInput
        roomId={currentRoom.id}
        userId={user?.id as string}
        email={user?.email || ""}
      />
    </div>
  ) : null;
}

export default Chatbox;
