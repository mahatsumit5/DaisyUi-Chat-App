import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { IChatRoom } from "../types";

import defaultImg from "../assets/images/default-profile.jpg";
import { setCurrentRoom } from "../redux/reducer/room.slice";
import { chatroomReturnType } from "../redux/api/room";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
function ChatMenu({
  setRooms,
  rooms,
  handleSearch,
  data,
  error,
  isLoading,
}: ChatMenuProps) {
  const { user } = useAppSelector((store) => store.user);
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { onlineUsers } = useAppSelector((store) => store.onlineUsers);
  const dispatch = useAppDispatch();

  function handleClick(room: IChatRoom) {
    dispatch(setCurrentRoom(room));
  }

  useEffect(() => {
    if (!data) return;
    setRooms(data.data);
  }, [dispatch, data, user, setRooms]);

  return (
    <div className="flex flex-col gap-2 w-full md:w-[300px] h-full">
      <label className="input input-sm bg-white   items-center gap-2 flex justify-between">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="text-[16px]"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {error ? (
        <section className=" h-full rounded-xl  flex  flex-col gap-2 overflow-y-auto bg-slate-50/85 items-center justify-center ">
          <p>You do not have any friends</p>
          <Link to={"/friend-request"}>
            <button className="btn btn-primary text-white">Connect </button>
          </Link>
        </section>
      ) : isLoading ? (
        <section className="skeleton h-full bg-slate-200" />
      ) : data ? (
        <>
          <section className=" h-full rounded-xl  flex  flex-col gap-2 overflow-y-auto bg-slate-50/85 ">
            {rooms.map((item: IChatRoom) => (
              <div
                key={item.id}
                className={`flex justify-between border-b p-2 hover:bg-slate-300 ${
                  currentRoom?.id === item.id
                    ? "bg-slate-300 rounded-md "
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
    </div>
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
