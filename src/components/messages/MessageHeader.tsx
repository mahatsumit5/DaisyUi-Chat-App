import { CiSearch } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { room } from "../../types";

function MessageHeader({ currentRoom }: { currentRoom: room }) {
  return (
    <header className="bg-white w-full rounded-xl p-3 flex justify-between">
      <div className="flex gap-3">
        <button>Back</button>
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src={currentRoom.profile || ""} />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-black font-bold text-sm">
            {currentRoom.fName}
            {currentRoom.lName}
          </p>
          <p className="text-sm">Online</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <button className="btn  rounded-full btn-sm">Profile</button>
        <button className="btn btn-neutral rounded-full btn-sm">Call</button>
        <div className="divider divider-horizontal" />
        <button className="">
          <CiSearch />
        </button>
        <button>
          <IoIosMore />
        </button>
      </div>
    </header>
  );
}

export default MessageHeader;
