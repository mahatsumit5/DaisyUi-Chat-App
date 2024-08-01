import { useState } from "react";
import { useAppSelector } from "../hook";
import MessageBox from "./messages/MessageBox";
import MessageHeader from "./messages/MessageHeader";
import MessageInput from "./messages/MessageInput";
function Chatbox() {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>("");

  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { user } = useAppSelector((store) => store.user);

  const [status, setStatus] = useState<{
    isLoading: boolean;
    isError: boolean;
  }>({ isError: false, isLoading: false });

  return currentRoom?.id ? (
    <div className="flex flex-col  w-full h-full  bg-base-100  justify-start relative">
      <MessageHeader currentRoom={currentRoom} />
      <MessageBox
        message={message}
        userId={user?.id as string}
        isError={status.isError}
        isSendingMessageLoading={status.isLoading}
        userName={user?.fName as string}
        preview={preview}
      />
      <MessageInput
        message={message}
        setStatus={setStatus}
        id={currentRoom.id}
        userId={user?.id as string}
        email={user?.email || ""}
        setMessage={setMessage}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
      />
    </div>
  ) : null;
}

export default Chatbox;
