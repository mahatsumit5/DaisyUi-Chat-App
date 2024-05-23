import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { getMessageAction } from "../action/message.action";
import MessageBox from "./messages/MessageBox";
import MessageHeader from "./messages/MessageHeader";
import MessageInput from "./messages/MessageInput";
function Chatbox() {
  const dispatch = useAppDispatch();
  const { currentRoom } = useAppSelector((store) => store.currentRoom);
  const { user } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (!currentRoom.id) {
      return;
    }
    dispatch(getMessageAction(currentRoom.id, 15));
  }, [currentRoom.id, dispatch]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <MessageHeader currentRoom={currentRoom} />
      <MessageBox
        messages={currentRoom.messages}
        userId={user?.id || ""}
        count={currentRoom.count}
        roomId={currentRoom.id}
      />
      <MessageInput id={currentRoom.id} userId={user?.id as string} />
    </div>
  );
}

export default Chatbox;
