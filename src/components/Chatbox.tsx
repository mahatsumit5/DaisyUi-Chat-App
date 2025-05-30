import { useAppSelector } from "../hooks/hook"
import MessageBox from "./messages/MessageBox"
import MessageHeader from "./messages/MessageHeader"
import MessageInput from "./messages/MessageInput"
function Chatbox() {
  const { currentRoom } = useAppSelector(store => store.rooms)
  const { user } = useAppSelector(store => store.user)
  return currentRoom?.id ? (
    <div className="flex flex-col  w-full h-full  mt-1 relative rounded-md bg-base-100">
      <MessageHeader currentRoom={currentRoom} />
      <MessageBox
        userId={user?.id as string}
        userName={user?.fName as string}
      />
      <MessageInput
        roomId={currentRoom.id}
        userId={user?.id as string}
        email={user?.email || ""}
        receiverId={currentRoom?.userId as string}
      />
    </div>
  ) : null
}

export default Chatbox
