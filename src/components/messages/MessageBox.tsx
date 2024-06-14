import { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hook";
import { FaArrowUp, FaCheckCircle } from "react-icons/fa";
import { useGetMessagesQuery } from "../../redux";
import { GoDotFill } from "react-icons/go";
import { socket } from "../../utils/socket";

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
  const { data, error, isLoading, isUninitialized, refetch } =
    useGetMessagesQuery({
      roomId: currentRoom?.id || "",
      num: numberOfMessageToDisplay,
    });
  useEffect(() => {
    const height = sectionRef.current?.scrollHeight;
    if (sectionRef.current && height) {
      sectionRef.current.scrollTop = height;
    }
  }, [data]);

  useCallback(() => {
    if (!isUninitialized) {
      refetch();
    }
  }, [isUninitialized, refetch]);

  useEffect(() => {
    socket.on("typing", (email) => {
      console.log(email);
    });
  }, []);

  return error ? (
    <>Unexpected Error Occured</>
  ) : isLoading ? (
    <section className="skeleton w-full h-full bg-slate-300" />
  ) : data ? (
    <section
      className="bg-white  min-h-full rounded-xl p-2 flex flex-col gap-2   w-full overflow-y-auto max-h-fit  "
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
                  {author === userId
                    ? userName
                    : currentRoom?.fName + " " + currentRoom?.lName}
                  <time className="text-xs opacity-50">
                    {getTime(createdAt).slice(0, 5)}
                  </time>
                </div>
                <div className="chat-bubble bg-blue-500 text-white">
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

            // <div
            //   key={id}
            //   className={`flex gap-2 items-center ${
            //     author === userId ? "justify-end" : "justify-start"
            //   }`}
            // >
            //   <div className="bg-black h-8 rounded-full w-8">
            //     <img
            //       src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
            //       className="object-cover overflow-hidden h-8 w-8 rounded-full"
            //     />
            //   </div>
            //   <div
            //     className={`${
            //       author === userId
            //         ? "bg-blue-500 text-slate-200"
            //         : "bg-gray-200 text-black"
            //     } p-2  rounded-lg  text-justify max-w-80 min-w-24`}
            //   >
            //     <span>{content}</span>
            //     <p
            //       className={`${
            //         author === userId ? "text-gray-300" : "text-gray-400"
            //       } text-xs  text-right flex justify-end gap-5`}
            //     >
            //       {getTime(createdAt).slice(0, 5)}
            //       {author === userId && (
            //         <FaCheckCircle
            //           className="mt-1"
            //           color={isSeen ? "blue" : "white"}
            //         />
            //       )}
            //     </p>
            //   </div>
            // </div>
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
          <div className=" h-8 rounded-full w-8">
            <img
              src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
              className="object-cover overflow-hidden h-8 w-8 rounded-full"
            />
          </div>
          <span className="p-2 bg-blue-900 text-slate-200 rounded-lg gap-2  flex items-center justify-center max-w-80 min-w-24">
            {message}
            {isError ? <></> : <FaCheckCircle className="mt-1 text-gray-300" />}
          </span>
        </div>
      )}
    </section>
  ) : (
    <p>this page is broken</p>
  );
}

export default MessageBox;
