import { IoIosMore } from "react-icons/io";
import { IChatRoom } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../hook";
import { setCurrentRoom } from "../../redux/reducer/room.slice";
import { IoChevronBackSharp } from "react-icons/io5";

function MessageHeader({
  currentRoom,
  setComponent,
}: {
  currentRoom: IChatRoom;
  setComponent: Dispatch<SetStateAction<"profile" | "message">>;
}) {
  const dispatch = useAppDispatch();
  return (
    <header className="bg-white w-full rounded-xl p-3 flex justify-between">
      <div className="flex gap-5">
        <button
          onClick={() => {
            dispatch(setCurrentRoom(null));
          }}
          className="md:hidden"
        >
          <IoChevronBackSharp size={24} />
        </button>
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img
              src={
                currentRoom.profile ||
                "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
              }
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-black font-bold ">
            {currentRoom.fName}&nbsp;
            {currentRoom.lName}
          </p>
          {/* <p className="text-sm">Online</p> */}
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center pr-5">
        <button
          className="btn btn-ghost btn-sm text-white bg-blue-400 rounded-full "
          onClick={() => {
            setComponent("profile");
          }}
        >
          Profile
        </button>
        <div className="divider divider-horizontal" />

        <button>
          <IoIosMore size={30} />
        </button>
      </div>
    </header>
  );
}

export default MessageHeader;
