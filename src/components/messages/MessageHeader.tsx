import { IoIosMore } from "react-icons/io";
import { IChatRoom } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../hook";
import { setCurrentRoom } from "../../redux/reducer/room.slice";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdPhoneEnabled } from "react-icons/md";
import { useDeleteChatRoomMutation } from "../../redux";

function MessageHeader({
  currentRoom,
  setComponent,
}: {
  currentRoom: IChatRoom;
  setComponent: Dispatch<SetStateAction<"profile" | "message">>;
}) {
  const dispatch = useAppDispatch();
  const [deleteChatRoom] = useDeleteChatRoomMutation();
  function deleteRoomHandle() {
    deleteChatRoom(currentRoom.id)
      .unwrap()
      .then((response) => {
        if (response) {
          dispatch(setCurrentRoom(null));
        }
      });
  }
  return (
    <header className="bg-white w-full rounded-xl p-2 flex justify-between">
      <div className="flex gap-5">
        <button
          onClick={() => {
            dispatch(setCurrentRoom(null));
          }}
          className="md:hidden"
        >
          <IoChevronBackSharp size={24} />
        </button>
        <div
          className="avatar online"
          onClick={() => {
            setComponent("profile");
          }}
        >
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
      <div className="flex gap-5 justify-between items-center pr-2">
        <button className="btn  btn-ghost ">
          <MdPhoneEnabled size={25} />
        </button>

        <button onClick={deleteRoomHandle}>
          <IoIosMore size={30} />
        </button>
      </div>
    </header>
  );
}

export default MessageHeader;
