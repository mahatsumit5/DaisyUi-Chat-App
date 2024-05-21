import { Imessage } from "../../types";

function getTime(time: Date) {
  return new Date(time).toTimeString();
}
function MessageBox({
  messages,
  userId,
}: {
  messages: Imessage[];
  userId: string;
}) {
  return (
    <section className="bg-white  rounded-xl p-4 flex flex-col gap-2 overflow-y-auto flex-1 w-full ">
      {messages.map(({ author, content, createdAt }) => {
        return (
          <div
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
              } p-2  rounded-lg  w-fit text-justify max-w-80`}
            >
              <span>{content}</span>
              <p
                className={`${
                  author === userId ? "text-gray-300" : "text-gray-400"
                } text-xs  text-right`}
              >
                {getTime(createdAt).slice(0, 5)}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default MessageBox;
