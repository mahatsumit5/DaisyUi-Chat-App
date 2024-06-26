import { IChatRoom, IMessage, IUser } from "../../types";

type props = {
  userId: string;
  messages: IMessage[];
  userName: string;
  user: IUser;
  currentRoom: IChatRoom;
};
const MessageDisplay = ({
  messages,
  userId,
  userName,
  currentRoom,
  user,
}: props) => {
  return (
    <>
      {messages.map(({ author, content, createdAt, id, isSeen }) => {
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
                    src={
                      (author === userId
                        ? user?.profile
                        : currentRoom?.profile) ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
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
              {content.includes(
                "https://cfw-image-bucket.s3.ap-southeast-2.amazonaws.com"
              ) ? (
                <div className="avatar">
                  <div className="w-52 rounded">
                    <img src={content} />
                  </div>
                </div>
              ) : (
                <div
                  className={`chat-bubble   ${
                    author === userId
                      ? "bg-primary text-primary-content"
                      : " bg-gray-200 text-slate-600"
                  }`}
                >
                  {content}
                </div>
              )}
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
      })}
    </>
  );
};

export default MessageDisplay;
function getTime(time: Date) {
  return new Date(time).toTimeString();
}
