import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { IChatRoom } from "../types";
import { socket } from "../utils/socket";

import defaultImg from "../assets/images/default-profile.jpg";
import { setCurrentRoom } from "../redux/reducer/room.slice";
import { chatroomReturnType } from "../redux/api/room";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryActionCreatorResult,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
function ChatMenu({
  setRooms,
  rooms,
  handleSearch,
  data,
  error,
  isLoading,
  refetch,
}: ChatMenuProps) {
  const { user } = useAppSelector((store) => store.user);
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { onlineUsers } = useAppSelector((store) => store.onlineUsers);
  const dispatch = useAppDispatch();

  function handleClick(room: IChatRoom) {
    dispatch(setCurrentRoom(room));
  }
  useEffect(() => {
    const roomIds = data?.data.map((item) => item.id);
    socket.emit("join-room", roomIds as [], user?.email as string);
  }, [data, user]);

  useEffect(() => {
    socket.on("send_message_client", () => {
      refetch();
    });
    if (!data) return;
    setRooms(data.data);
  }, [dispatch, data, refetch, user, setRooms]);

  return (
    <>
      <input
        type="text"
        className="md:hidden bg-slate-100  p-3  rounded-lg mt-1"
        placeholder="Search...."
        onChange={handleSearch}
      />

      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <section className="skeleton h-full bg-slate-200" />
      ) : data ? (
        <>
          <section className=" h-full rounded-xl p-2 flex  flex-col gap-5 overflow-y-auto bg-slate-50/85">
            {rooms.map((item: IChatRoom) => (
              <div
                key={item.id}
                className={`flex justify-between border-b p-2 hover:bg-slate-300 ${
                  currentRoom?.id === item.id
                    ? "bg-slate-300/80 rounded-md"
                    : "rounded-md"
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
                    <p className="text-black font-bold text-sm">
                      {item.fName}&nbsp;
                      {item.lName}
                    </p>

                    <p
                      className={`${
                        item.isLastMessageSeen
                          ? ``
                          : `${
                              item.lastmessageAuthor !== user?.id
                                ? "text-black font-semibold"
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
      ) : null}
    </>
  );
}

export default ChatMenu;

type ChatMenuProps = {
  rooms: IChatRoom[];
  setRooms: Dispatch<SetStateAction<IChatRoom[]>>;
  handleSearch: (e: FormEvent<HTMLInputElement>) => void;
  data: chatroomReturnType;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      void,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      "Rooms",
      chatroomReturnType,
      "roomApi"
    >
  >;
};
