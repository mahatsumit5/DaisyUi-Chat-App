import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hook";
import { FaArrowUp } from "react-icons/fa";
import { useGetMessagesQuery } from "../../redux";
import { GoDotFill } from "react-icons/go";

function getTime(time: Date) {
  return new Date(time).toTimeString();
}
function MessageBox({
  userId,
  isError,
  isSendingMessageLoading,
  message,
  userName,
}: {
  userName: string;
  message: string;
  userId: string;
  isError: boolean;
  isSendingMessageLoading: boolean;
}) {
  const { currentRoom } = useAppSelector((store) => store.rooms);
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
  console.log(isError);
  return error ? (
    <>Unexpected Error Occured</>
  ) : isLoading ? (
    <section className="skeleton w-full h-full bg-base-300 flex-1" />
  ) : data?.result._count.messages ? (
    <section
      className="p-2 flex flex-col  border-b-2  flex-1  max-h-[72dvh]  overflow-y-scroll"
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
      {data.result.messages.map(
        ({ author, content, createdAt, id, isSeen }) => {
          return (
            <div key={id}>
              <div
                className={`chat ${
                  author === userId ? "chat-end" : "chat-start"
                }`}
                key={id}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {author === userId ? userName : currentRoom?.fName}
                  &nbsp;
                  <time className="text-xs opacity-50">
                    {getTime(createdAt).slice(0, 5)}
                  </time>
                </div>
                <div
                  className={`chat-bubble   ${
                    author === userId
                      ? "bg-primary text-primary-content"
                      : " bg-gray-200 text-slate-600"
                  }`}
                >
                  {content}
                </div>
                <div className="chat-footer opacity-50">
                  {author === userId
                    ? isSeen
                      ? `seen at ${getTime(createdAt).slice(0, 5)}`
                      : null
                    : "Deivered"}
                </div>
              </div>
            </div>
          );
        }
      )}
      {isTyping && (
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex">
            <div className="bg-black h-8 rounded-full w-8">
              <img
                src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
                className="object-cover overflow-hidden h-8 w-8 rounded-full"
              />
            </div>
            <span className="  w-14 rounded-full flex justify-center items-center h-7">
              <GoDotFill className="animate-bounce" />
              <GoDotFill className="animate-bounce" />
              <GoDotFill className="animate-bounce" />
            </span>
          </div>
          <span>{currentRoom?.fName} is typing</span>
        </div>
      )}

      {isSendingMessageLoading && message && (
        <div className="flex justify-end gap-2">
          <div
            className={`chat-bubble   
bg-primary/80 text-primary-content
                       
                  `}
          >
            {message}
          </div>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  ) : (
    <section className="flex-1 border-b-2">
      You do not have any messages.
    </section>
  );
}

export default MessageBox;
