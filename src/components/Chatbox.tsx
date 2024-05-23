import { useState } from "react";
import { useAppSelector } from "../hook";
import MessageBox from "./messages/MessageBox";
import MessageHeader from "./messages/MessageHeader";
import MessageInput from "./messages/MessageInput";
import Profile from "./messages/Profile";
function Chatbox() {
  // const dispatch = useAppDispatch();
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { user } = useAppSelector((store) => store.user);

  // useEffect(() => {
  //   if (!currentRoom.id) {
  //     return;
  //   }
  //   // dispatch(getMessageAction(currentRoom.id, 15));
  // }, [currentRoom.id, dispatch, user]);
  const [component, setComponent] = useState<"message" | "profile">("message");
  const displayComponent = {
    message: (
      <MessageBox
        messages={currentRoom.messages}
        userId={user?.id || ""}
        count={currentRoom._count}
        roomId={currentRoom.id}
      />
    ),

    profile: <Profile setComponent={setComponent} type="friend" />,
  };
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <MessageHeader currentRoom={currentRoom} setComponent={setComponent} />
      {displayComponent[component]}
      <MessageInput id={currentRoom.id} userId={user?.id as string} />
    </div>
  );
}

export default Chatbox;
