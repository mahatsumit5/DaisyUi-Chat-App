import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hook";
import { FaArrowUp } from "react-icons/fa";
import { useGetMessagesQuery } from "../../redux";
import MessageLoadingState from "./MessageLoadingState";
import { IChatRoom, IUser } from "../../types";
import UserIsTyping from "./UserIsTyping";
import MessageDisplay from "./MessageDisplay";

function MessageBox({
  userId,
  isError,
  isSendingMessageLoading,
  message,
  userName,
  preview,
}: messageBoxProps) {
  console.log(isError);
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { user } = useAppSelector((store) => store.user);

  const { isTyping } = useAppSelector((store) => store.socket);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [numberOfMessageToDisplay, setNumberOfMessageToDisplay] = useState(10);
  const { data, error, isLoading } = useGetMessagesQuery({
    roomId: currentRoom?.id || "",
    num: numberOfMessageToDisplay,
  });

  useEffect(() => {
    const height = sectionRef.current?.scrollHeight;
    if (sectionRef.current && height) {
      sectionRef.current.scrollTop = height;
    }
  }, [data]);

  return error ? (
    <>Unexpected Error Occured</>
  ) : isLoading ? (
    <section className="skeleton w-full h-full bg-base-300 flex-1" />
  ) : data?.result._count.messages ? (
    <section
      className="p-2 flex flex-col  border-b-2 border-b-base-300  flex-1 max-h-[80dvh] md:max-h-[72dvh]  overflow-y-scroll min-h-[60dvh] "
      ref={sectionRef}
    >
      {numberOfMessageToDisplay < data.result._count.messages && (
        <button
          className="animate-bounce mb-5 w-full  flex items-center justify-center"
          onClick={() => {
            setNumberOfMessageToDisplay(numberOfMessageToDisplay + 5);
          }}
        >
          <FaArrowUp />
        </button>
      )}
      <MessageDisplay
        userName={userName}
        currentRoom={currentRoom as IChatRoom}
        messages={data.result.messages}
        user={user as IUser}
        userId={userId}
      />

      <UserIsTyping
        currentRoom={currentRoom as IChatRoom}
        isTyping={isTyping}
      />
      <MessageLoadingState
        message={message}
        messageLoading={isSendingMessageLoading}
        preview={preview}
        user={user as IUser}
      />
    </section>
  ) : (
    <section className="flex-1 border-b-2">
      You do not have any messages.
    </section>
  );
}

export default MessageBox;
type messageBoxProps = {
  userName: string;
  message: string;
  userId: string;
  isError: boolean;
  isSendingMessageLoading: boolean;
  preview: string;
};
