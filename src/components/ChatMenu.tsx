import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { IChatRoom } from "../types";
import { socket } from "../utils/socket";

import MobileDrawer from "./MobileDrawer";
import defaultImg from "../assets/images/default-profile.jpg";
import {
  replaceLastMessageInSpecificRoom,
  setCurrentRoom,
} from "../redux/reducer/room.slice";
import { useGetAllChatRoomQuery } from "../redux";
function ChatMenu() {
  const { data, error, isLoading } = useGetAllChatRoomQuery();
  const { user } = useAppSelector((store) => store.user);
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const dispatch = useAppDispatch();
  const [rooms, setRooms] = useState<IChatRoom[]>([]);
  function handleClick(room: IChatRoom) {
    dispatch(setCurrentRoom(room));
  }

  // useEffect(() => {}, [data]);

  useEffect(() => {
    socket.on("send_message_client", (data, id) => {
      dispatch(replaceLastMessageInSpecificRoom({ message: data, roomId: id }));
    });
    if (!data) return;
    setRooms(data.data);
    const roomId = data.data.map((item: IChatRoom) => item.id);
    socket.emit("join-room", roomId);
  }, [dispatch, data]);

  function handleSearch(e: FormEvent<HTMLInputElement>) {
    if (!data) return;
    setRooms(
      data.data.filter((item) =>
        item.fName.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    );
  }
  return (
    <>
      <header className="flex bg-white rounded-xl  justify-between p-4 items-center overflow-hidden">
        <h1 className="text-2xl text-black font-bold">Chat</h1>

        <MobileDrawer />

        <div className=" gap-5  hidden md:flex">
          <label className="input input-ghost    items-center gap-2 flex">
            <input
              type="text"
              className="hidden sm:block"
              placeholder="Search"
              onChange={handleSearch}
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
        </div>
      </header>

      <input
        className="md:hidden input input-bordered"
        placeholder="Search...."
        onChange={handleSearch}
      />

      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <section className="skeleton h-full bg-slate-200" />
      ) : data ? (
        <>
          <section className="bg-white h-full rounded-xl p-2 flex flex-col gap-5 overflow-y-auto">
            {rooms.map((item: IChatRoom) => (
              <div
                key={item.id}
                className={`flex justify-between border-b p-2 hover:bg-slate-200 ${
                  currentRoom?.id === item.id
                    ? "bg-slate-200 rounded-md"
                    : "rounded-md"
                }`}
                onClick={() => {
                  handleClick(item);
                }}
              >
                <div className="flex gap-3">
                  <div className="avatar offline">
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
