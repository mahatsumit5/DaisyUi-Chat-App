import { IChatRoom, IUser } from "../../types"
import { Message } from "../../types/types"

type props = {
  userId: string
  messages: Message[]
  userName: string
  user: IUser
  currentRoom: IChatRoom
}
const MessageDisplay = ({
  messages,
  userId,
  userName,
  currentRoom,
  user,
}: props) => {
  return (
    <>
      {messages.map(({ authorId, content, createdAt, id, isSeen }) => {
        return (
          <div key={id}>
            <div
              className={`chat ${
                authorId === userId ? "chat-end" : "chat-start"
              }`}
              key={id}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      (authorId === userId
                        ? user?.profile
                        : currentRoom?.profile) ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="chat-header">
                {authorId === userId ? userName : currentRoom?.fName}
                &nbsp;
                <time className="text-xs opacity-50">
                  {getTime(new Date(createdAt)).slice(0, 5)}
                </time>
              </div>
              {content.includes("https://cfw-image-bucket.s3") ? (
                <div className="avatar">
                  <div className="w-52 rounded">
                    <img src={content} loading="lazy" />
                  </div>
                </div>
              ) : (
                <div
                  className={`chat-bubble   ${
                    authorId === userId
                      ? "bg-primary text-primary-content"
                      : " bg-gray-200 text-slate-600"
                  }`}
                >
                  {content}
                </div>
              )}
              <div className="chat-footer opacity-50">
                {authorId === userId
                  ? isSeen
                    ? `seen at ${getTime(new Date(createdAt)).slice(0, 5)}`
                    : null
                  : "Deivered"}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default MessageDisplay
function getTime(time: Date) {
  return new Date(time).toTimeString()
}
