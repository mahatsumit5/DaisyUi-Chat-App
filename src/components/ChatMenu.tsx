import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { joinRoom } from "../redux-slice/JoinRoom";
import { IUser } from "../types";
import { socket } from "../utils/socket";

import MobileDrawer from "./MobileDrawer";

function ChatMenu() {
  const { chatRoom } = useAppSelector((store) => store.currentRoom);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState({ message: "", id: "" });
  function handleClick(friend: IUser) {
    dispatch(joinRoom(friend));
  }

  useEffect(() => {
    const roomId = chatRoom.map((item) => item.id);
    socket.emit("join-room", roomId);
  }, [chatRoom]);

  return (
    <>
      <header className="flex bg-white rounded-xl  justify-between p-4 items-center overflow-hidden">
        <div className="flex gap-5">
          <MobileDrawer />

          <h1 className="text-2xl text-black font-bold">Chat</h1>
        </div>

        <div className="flex gap-5">
          <div>
            <label className="input input-ghost   flex items-center gap-2">
              <input
                type="text"
                className="hidden sm:block"
                placeholder="Search"
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
          <button className="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </header>
      <section className="bg-white h-full rounded-xl p-4 flex flex-col gap-5 overflow-y-auto">
        {chatRoom.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b p-2 hover:bg-slate-200"
            onClick={() => {
              handleClick(item);
            }}
          >
            <div className="flex gap-3">
              <div className="avatar offline">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="flex flex-col ">
                <p className="text-black font-bold text-sm">
                  {item.fName}&nbsp;
                  {item.lName}
                </p>

                {item.id === message.id ? (
                  <p className="font-semibold text-black">{message.message}</p>
                ) : (
                  <p className="text-sm">asdfasf</p>
                )}
              </div>
            </div>
            {/* Date and notification */}
            <div className="flex flex-col items-end">
              <p className="flex-1">10:27 AM</p>
              {item.id === message.id && (
                <span className="rounded-full  bg-red-400 text-sm  flex justify-center text-white w-6">
                  1
                </span>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default ChatMenu;
