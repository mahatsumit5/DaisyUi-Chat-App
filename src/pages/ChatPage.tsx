import { Link } from "react-router-dom";
import ChatMenu from "../components/ChatMenu";
import Chatbox from "../components/Chatbox";
import { useAppSelector } from "../hook";
import { FormEvent, useState } from "react";
import { useGetAllChatRoomQuery } from "../redux";
import { IChatRoom } from "../types";
import { chatroomReturnType } from "../redux/api/room";
function ChatPage() {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { data, error, isLoading, isError } = useGetAllChatRoomQuery(null);
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
    <div className="flex h-full gap-2">
      <div
        className={`    ${
          currentRoom?.id ? "hidden lg:flex " : "flex w-full  "
        } `}
      >
        <ChatMenu
          rooms={rooms}
          setRooms={setRooms}
          handleSearch={handleSearch}
          data={data as chatroomReturnType}
          error={error}
          isLoading={isLoading}
        />
      </div>

      {currentRoom?.id ? (
        <div className={` ${currentRoom?.id ? "w-full" : ""}  `}>
          <Chatbox />
        </div>
      ) : (
        isError && (
          <div
            className={` hidden md:flex w-full flex-col justify-center items-center gap-5`}
          >
            <p className="text-2xl">Select a Room</p>
            <p>or</p>
            <Link to={"/friends"}>
              <button className="btn btn-primary text-white">
                Finddsdsd New People
              </button>
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default ChatPage;
