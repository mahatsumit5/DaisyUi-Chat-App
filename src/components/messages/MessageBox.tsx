import { useEffect, useRef, useState } from "react";
import { Imessage } from "../../types";
import { useAppDispatch } from "../../hook";
import { getMessageAction } from "../../action/message.action";
import { FaArrowUp, FaCheckCircle } from "react-icons/fa";

function getTime(time: Date) {
  return new Date(time).toTimeString();
}
function MessageBox({
  messages,
  userId,
  count,
  roomId,
}: {
  count: number;
  messages: Imessage[];
  userId: string;
  roomId: string;
}) {
  const dispatch = useAppDispatch();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [skip, setSkip] = useState(15);
  useEffect(() => {
    const height = sectionRef.current?.scrollHeight;
    if (sectionRef.current && height) {
      sectionRef.current.scrollTop = height;
    }
  }, [messages]);
  // useEffect(() => {
  //   if (sectionRef.current) {
  //     sectionRef.current.onscroll = () => {
  //       const height = sectionRef.current?.scrollTop;
  //       if (height === 0 && skip < count) {
  //         console.log(height);
  //         setSkip(skip + 15);
  //       }
  //     };
  //   }
  // }, [skip, count]);

  // useEffect(() => {
  //   console.log(skip);
  // dispatch(getMessageAction(roomId, skip));

  // }, [skip, dispatch, roomId]);
  function loadMore() {
    dispatch(getMessageAction(roomId, skip + 15));
    setSkip(skip + 15);
  }
  return (
    <section
      className="bg-white  rounded-xl p-4 flex flex-col gap-2 overflow-y-auto flex-1 w-full "
      ref={sectionRef}
    >
      {skip < count && (
        <button
          className="animate-bounce mb-5 w-full  flex items-center justify-center"
          onClick={loadMore}
        >
          <FaArrowUp />
        </button>
      )}
      {messages.map(({ author, content, createdAt, id, isSeen }) => {
        return (
          <div
            key={id}
            className={`flex gap-2 items-center ${
              author === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div className="bg-black h-8 rounded-full w-8">
              <img
                src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
                className="object-cover overflow-hidden h-8 w-8 rounded-full"
              />
            </div>
            <div
              className={`${
                author === userId
                  ? "bg-blue-500 text-slate-200"
                  : "bg-gray-200 text-black"
              } p-2  rounded-lg  text-justify max-w-80 min-w-24`}
            >
              <span>{content}</span>
              <p
                className={`${
                  author === userId ? "text-gray-300" : "text-gray-400"
                } text-xs  text-right flex justify-end gap-5`}
              >
                {getTime(createdAt).slice(0, 5)}
                {author === userId && (
                  <FaCheckCircle
                    className="mt-1"
                    color={isSeen ? "blue" : "white"}
                  />
                )}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default MessageBox;
