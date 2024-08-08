import React from "react";
import { IChatRoom, IUser } from "../../types";
import { Avatar } from "../Avatar/Avatar";
import { extractInitial } from "../../utils";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoPersonAddSharp } from "react-icons/io5";
import { useSendFriendRequestMutation } from "../../redux";
import { useAppDispatch } from "../../hook";
import { toggleMessageBox } from "../../redux/reducer/HomeMessageBox";
import { setCurrentRoom } from "../../redux/reducer/room.slice";

const HomeAllUsers: React.FC<{
  user: IUser;
  type: "users" | "friends";
  room?: IChatRoom;
}> = ({ user, type, room }) => {
  const [sendRequest] = useSendFriendRequestMutation();
  const dispatch = useAppDispatch();
  const handleOnClick = () => {
    switch (type) {
      case "users":
        sendRequest({ page: 1, to: user.id });
        break;
      case "friends":
        if (room?.id) {
          dispatch(toggleMessageBox({ isOpen: true, chatRoom: room }));
          dispatch(setCurrentRoom(room));
        }
    }
  };
  return (
    <div className="flex justify-between items-center  w-full  p-2  border-b-2 bg-base-100 rounded-md">
      <div className="flex gap-2 items-center">
        <Avatar
          initial={extractInitial(user.fName, user.lName)}
          url={user.profile}
          key={user.id}
          classname="w-10 h-auto"
        />
        <span>
          <p className=" text-xs font-bold">
            {user.fName} {user.lName}
          </p>
          <p className=" text-xs text-base-content/70">{user.email} </p>
        </span>
      </div>
      <button
        className="btn btn-xs btn-success btn-gh btn-square btn-outline"
        onClick={handleOnClick}
      >
        {type === "friends" ? (
          <BiSolidMessageRounded size={16} />
        ) : (
          <IoPersonAddSharp size={16} />
        )}
      </button>
    </div>
  );
};

export default HomeAllUsers;
