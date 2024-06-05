import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hook";
import { FaArrowUp, FaCheckCircle } from "react-icons/fa";
import { useGetMessagesQuery } from "../../redux";

function getTime(time: Date) {
  return new Date(time).toTimeString();
}
function MessageBox({ userId }: { userId: string }) {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [numberOfMessageToDisplay, setNumberOfMessageToDisplay] = useState(10);

  const { data, error, isLoading, isFetching } = useGetMessagesQuery({
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
  ) : isFetching || isLoading ? (
    <>I am loading........</>
  ) : data ? (
    <section
      className="bg-white  rounded-xl p-4 flex flex-col gap-2 overflow-y-auto flex-1 w-full "
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
        }
      )}
    </section>
  ) : (
    <p>this page is broken</p>
  );
}

export default MessageBox;
