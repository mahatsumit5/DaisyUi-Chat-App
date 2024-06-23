import { Link } from "react-router-dom";
import ChatMenu from "../components/ChatMenu";
import Chatbox from "../components/Chatbox";
import { useAppSelector } from "../hook";
import { useEffect, useState } from "react";
import { useGetAllChatRoomQuery } from "../redux";
import { IChatRoom } from "../types";
function ChatPage() {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const { query, type } = useAppSelector((store) => store.search);
  const { data, error, isLoading, isError } = useGetAllChatRoomQuery(null);
  const [rooms, setRooms] = useState<IChatRoom[]>(data?.data || []);

  useEffect(() => {
    if (type !== "Messages") return;
    function handleSearch() {
      if (!data) return;
      setRooms(
        data.data.filter((item) =>
          item.fName.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    handleSearch();
  }, [query, type, data]);

  return (
    <div className="flex h-full gap-2">
      <div
        className={`    ${
          currentRoom?.id ? "hidden lg:flex " : "flex w-full  "
        } `}
      >
        <ChatMenu rooms={rooms} error={error} isLoading={isLoading} />
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
