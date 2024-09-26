import { useEffect, useRef } from "react";
import { useAppSelector } from "../../hook";
import { FaArrowUp } from "react-icons/fa";
import { useGetMessagesQuery } from "../../redux";
import MessageLoadingState from "./MessageLoadingState";
import { IChatRoom, IUser } from "../../types";
import UserIsTyping from "./UserIsTyping";
import MessageDisplay from "./MessageDisplay";
import envelope from "../../assets/images/envelope.svg";
import useMessageHook from "../../hooks/useMessage.hook";

function MessageBox({ userId, userName }: messageBoxProps) {
  const { message, messageStatus, preview } = useMessageHook();
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { user } = useAppSelector((store) => store.user);
  const { isTyping } = useAppSelector((store) => store.socket);
  const { numOfMessages, setNumofMessages } = useMessageHook();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useGetMessagesQuery({
    roomId: currentRoom?.id || "",
    take: numOfMessages,
  });

  useEffect(() => {
    const height = sectionRef.current?.scrollHeight;
    if (sectionRef.current && height) {
      sectionRef.current.scrollTop = height;
    }
  }, [data, isTyping]);

  return error ? (
    <>Unexpected Error Occured</>
  ) : isLoading ? (
    <section className="skeleton w-full h-full bg-base-300 flex-1 max-h-fit " />
  ) : data?.result._count.messages ? (
    <section
      className="p-1 flex flex-col h-full overflow-y-auto   scroll-smooth border-b-2"
      ref={sectionRef}
    >
      {numOfMessages < data.result._count.messages && (
        <button
          className="animate-bounce mb-5 w-full  flex items-center justify-center"
          onClick={() => {
            setNumofMessages((prev) => prev + 5);
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

      <UserIsTyping />
      <MessageLoadingState
        message={message}
        messageLoading={messageStatus.isLoading}
        preview={preview}
        user={user as IUser}
      />
      <div>{preview}</div>
    </section>
  ) : (
    <section className="flex-1 flex items-center justify-center flex-col gap-2">
      <img src={envelope} className="w-28 md:w-40" />
      <p className="text-2xl font-semibold text-primary">No new messages</p>
    </section>
  );
}

export default MessageBox;
type messageBoxProps = {
  userName: string;
  userId: string;
};
