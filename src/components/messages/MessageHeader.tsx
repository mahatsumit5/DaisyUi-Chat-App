import { IChatRoom } from "../../types";
import { useAppDispatch } from "../../hook";
import { setCurrentRoom } from "../../redux/reducer/room.slice";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdDeleteOutline, MdPhoneEnabled } from "react-icons/md";
import { useDeleteChatRoomMutation } from "../../redux";
import { Avatar } from "../Avatar/Avatar";
import { extractInitial } from "../../utils";

function MessageHeader({ currentRoom }: { currentRoom: IChatRoom }) {
  const dispatch = useAppDispatch();
  const [deleteChatRoom] = useDeleteChatRoomMutation();

  // const { onlineUsers } = useAppSelector((store) => store.onlineUsers);
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
    <header className=" w-full  border-b-2 shadow-sm p-2 flex justify-between bg-base-100    z-[5]">
      <div className="flex gap-5">
        <button
          onClick={() => {
            dispatch(setCurrentRoom(null));
          }}
          className="lg:hidden"
        >
          <IoChevronBackSharp size={24} />
        </button>
        <Avatar
          initial={extractInitial(currentRoom.fName, currentRoom.lName)}
          url={currentRoom.profile}
          classname="h-12"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="text-base-content font-bold text-sm">
            {currentRoom.fName} {currentRoom.lName}
          </p>
        </div>
      </div>
      <div className="flex gap-5 justify-between items-center pr-2">
        <button className="btn  btn-ghost ">
          <MdPhoneEnabled size={25} />
        </button>

        <button onClick={deleteRoomHandle}>
          <MdDeleteOutline size={30} />
        </button>
      </div>
    </header>
  );
}

export default MessageHeader;
