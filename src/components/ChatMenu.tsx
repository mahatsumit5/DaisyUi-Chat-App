import { useAppDispatch, useAppSelector } from "../hooks/hook"
import { IChatRoom } from "../types"

import { setCurrentRoom } from "../redux/reducer/room.slice"

import { Link } from "react-router-dom"
import ErrorMessage from "./error/ErrorMessage"
import { ChatRoom } from "../types/types"
import { useGetAllChatRoomsQuery } from "../redux/api"

function ChatMenu() {
  const { user } = useAppSelector(store => store.user)
  const { currentRoom } = useAppSelector(store => store.rooms)
  const { query, type } = useAppSelector(store => store.search)
  const { data, error, isFetching } = useGetAllChatRoomsQuery(
    {
      contains: query,
      page: 1,
      take: 10,
    },
    {
      skip: type !== "Messages" ? true : false,
      // pollingInterval: 2000,
      refetchOnReconnect: true,
      // refetchOnMountOrArgChange: true,
    }
  )
  const { onlineUsers } = useAppSelector(store => store.onlineUsers)
  const dispatch = useAppDispatch()

  function handleClick(room: IChatRoom) {
    dispatch(setCurrentRoom(room))
  }

  return (
    <div
      className={`  bg-base-100 flex flex-col gap-2 w-full  lg:w-[400px] h-full overflow-y-auto  rounded-md ${
        currentRoom?.id ? "hidden lg:flex " : "flex w-full  "
      } `}
    >
      {error ? (
        <section className=" h-full rounded-xl  flex  flex-col gap-2 overflow-y-auto  items-center justify-center ">
          <p>You do not have any friends</p>
          <Link to={"/friend-request"}>
            <button className="btn btn-primary text-primary-content">
              Connect
            </button>
          </Link>
        </section>
      ) : isFetching ? (
        <section className="flex flex-col h-full bg-base-100 p-2  ` gap-5 ">
          {Array(20)
            .fill("")
            .map(() => (
              <LoadingRoom key={Math.random()} />
            ))}
        </section>
      ) : data?.getAllChatRooms.data.length ? (
        <>
          <section className=" h-full   flex  flex-col  overflow-y-auto bg-base-100 text-base-content overflow-hidden">
            {data?.getAllChatRooms?.data?.map((item: ChatRoom) => (
              <div
                key={item.id}
                className={`flex justify-between p-3 border-b border-b-primary/15 hover:bg-base-300  ${
                  currentRoom?.id === item.id ? "bg-base-200 " : ""
                }`}
                onClick={() => {
                  handleClick(item as IChatRoom)
                }}
              >
                <div className="flex gap-3">
                  {item.profile ? (
                    <div
                      className={`avatar ${
                        onlineUsers.includes(item.userId) ? "online" : "offline"
                      }`}
                    >
                      <div className="w-10 rounded-full">
                        <img src={item.profile} />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar placeholder">
                      <div className="bg-neutral/70 text-neutral-content w-12 rounded-full">
                        <span className="text-xl">
                          {item.fName.slice(0, 1)}
                          {item.lName.slice(0, 1)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col ">
                    <p className=" font-bold text-sm ">
                      {item.fName}&nbsp;
                      {item.lName}
                    </p>

                    <p
                      className={`${
                        item.isLastMessageSeen
                          ? ``
                          : `${
                              item.lastmessageAuthor !== user?.id
                                ? "text-primary font-semibold"
                                : ""
                            }`
                      }  line-clamp-1`}
                    >
                      {item.lastMessage}
                    </p>
                  </div>
                </div>
                {/* Date and notification */}
                <div className="flex flex-col items-end">
                  <p className="flex-1">10:27 AM</p>
                  {!item.isLastMessageSeen &&
                    item.lastmessageAuthor !== user?.id && (
                      <span className="rounded-full  bg-red-400 text-sm  flex justify-center text-white w-6">
                        {item.unSeenMessageCount !== 0 &&
                          item.unSeenMessageCount}
                      </span>
                    )}
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        <section className=" h-full md:rounded-xl  flex    bg-base-100 text-base-content overflow-hidden  items-center justify-center">
          <ErrorMessage />
        </section>
      )}
    </div>
  )
}
const LoadingRoom = () => {
  return (
    <section className="  w-full h-10 rounded-sm  flex justify-start  items-center gap-2 ">
      <section className="rounded-full bg-slate-300 w-10 h-10 skeleton"></section>
      <section className="flex-1 flex flex-col gap-2">
        <section className="skeleton w-24 bg-base-300 h-2"></section>
        <section className="skeleton w-16 bg-base-300 h-2"></section>
      </section>
      <section className="skeleton w-10 bg-base-300 h-2"></section>
    </section>
  )
}
export default ChatMenu
