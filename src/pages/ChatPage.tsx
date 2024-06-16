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
    <div className="flex flex-col w-full h-full gap-3 ">
      {!currentRoom && <MobileDrawer />}

      <div className="flex h-full gap-2">
        <div
          className={` flex-col gap-3    ${
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
