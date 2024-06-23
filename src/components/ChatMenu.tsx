import { useAppDispatch, useAppSelector } from "../hook";
import { IChatRoom } from "../types";

import defaultImg from "../assets/images/default-profile.jpg";
import { setCurrentRoom } from "../redux/reducer/room.slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
function ChatMenu({ rooms, error, isLoading }: ChatMenuProps) {
  const { user } = useAppSelector((store) => store.user);
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { onlineUsers } = useAppSelector((store) => store.onlineUsers);
  const dispatch = useAppDispatch();

  function handleClick(room: IChatRoom) {
    dispatch(setCurrentRoom(room));
  }

  return (
    <div className="flex flex-col gap-2 w-full  lg:w-[350px] h-full">
      {error ? (
        <section className=" h-full rounded-xl  flex  flex-col gap-2 overflow-y-auto  items-center justify-center ">
          <p>You do not have any friends</p>
          <Link to={"/friend-request"}>
            <button className="btn btn-primary text-white">Connect </button>
          </Link>
        </section>
      ) : isLoading ? (
        <section className="skeleton h-full bg-base-100" />
      ) : rooms.length ? (
        <>
          <section className=" h-full rounded-xl  flex  flex-col gap-2 overflow-y-auto bg-base-100 text-base-content ">
            {rooms.map((item: IChatRoom) => (
              <div
                key={item.id}
                className={`flex justify-between border-b p-2 hover:bg-base-300 ${
                  currentRoom?.id === item.id ? " rounded-md " : "rounded-md"
                }`}
                onClick={() => {
                  handleClick(item);
                }}
              >
                <div className="flex gap-3">
                  <div
                    className={`avatar ${
                      onlineUsers.includes(item.email) ? "online" : "offline"
                    }`}
                  >
                    <div className="w-10 rounded-full">
                      <img src={item.profile || defaultImg} />
                    </div>
                  </div>
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
        <section className=" h-full rounded-xl  flex  flex-col gap-2 overflow-y-auto bg-slate-50/85 items-center justify-center ">
          <p>You do not have any friends</p>
          <Link to={"/friend-request"}>
            <button className="btn btn-primary text-white">Connect </button>
          </Link>
        </section>
      )}
    </div>
  );
}

export default ChatMenu;

type ChatMenuProps = {
  rooms: IChatRoom[];
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
  // refetch: () => QueryActionCreatorResult<
  //   QueryDefinition<
  //     void,
  //     BaseQueryFn<
  //       string | FetchArgs,
  //       unknown,
  //       FetchBaseQueryError,
  //       object,
  //       FetchBaseQueryMeta
  //     >,
  //     "Rooms",
  //     chatroomReturnType,
  //     "roomApi"
  //   >
  // >;
};
