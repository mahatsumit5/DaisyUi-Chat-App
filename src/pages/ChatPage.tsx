import { Link } from "react-router-dom";
import ChatMenu from "../components/ChatMenu";
import Chatbox from "../components/Chatbox";
import { useAppSelector } from "../hook";
import MobileDrawer from "../components/MobileDrawer";
import { FormEvent, useState } from "react";
import { useGetAllChatRoomQuery } from "../redux";
import { IChatRoom } from "../types";
import { chatroomReturnType } from "../redux/api/room";

function ChatPage() {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { data, error, isLoading, refetch } = useGetAllChatRoomQuery();
  const [rooms, setRooms] = useState<IChatRoom[]>([]);

  function handleSearch(e: FormEvent<HTMLInputElement>) {
    if (!data) return;
    setRooms(
      data.data.filter((item) =>
        item.fName.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    );
  }

  return (
    <div className="flex flex-col w-full h-full ">
      <header className="flex  rounded-xl  justify-between  px-3 items-center overflow-hidden   w-full">
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
      <div className="flex h-full ">
        <div
          className={` flex-col gap-3 p-1   ${
            currentRoom?.id ? "hidden md:flex w-[300px]" : "flex w-full  "
          } `}
        >
          <ChatMenu
            rooms={rooms}
            setRooms={setRooms}
            handleSearch={handleSearch}
            data={data as chatroomReturnType}
            error={error}
            isLoading={isLoading}
            refetch={refetch}
          />
        </div>

        {currentRoom?.id ? (
          <div
            className={`  ${
              currentRoom?.id ? "md:block" : "hidden"
            }hidden md:block w-full  `}
          >
            <Chatbox />
          </div>
        ) : (
          <div
            className={` hidden md:flex w-full flex-col justify-center items-center gap-5`}
          >
            <p className="text-2xl">Select a Room</p>
            <p>or</p>
            <Link to={"/friends"}>
              <button className="btn btn-primary text-white">
                Find New People
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
