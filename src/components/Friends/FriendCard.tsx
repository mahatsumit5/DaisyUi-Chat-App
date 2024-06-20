import { Link } from "react-router-dom";
import { IChatRoom, IUser } from "../../types";
import { AiFillDelete, AiFillMessage } from "react-icons/ai";
import defaultImg from "../../assets/images/default-profile.jpg";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import {
  useAcceptFriendReqMutation,
  useDeleteSentRequestMutation,
  useSendFriendRequestMutation,
} from "../../redux";
import { TiDelete, TiTick } from "react-icons/ti";
import { setCurrentRoom } from "../../redux/reducer/room.slice";
type keys = "peoples" | "friends" | "request" | "SentRequest";

const FriendCard = ({
  user,
  type,
}: {
  user: IChatRoom | IUser;
  type: keys;
}) => {
  const [display] = useState<keys>(type);

  const displayComponent: Record<keys, JSX.Element> = {
    friends: <Friends user={user as IChatRoom} />,
    peoples: <AllPeoples user={user as IChatRoom} />,
    request: <FriendReq user={user as IUser} />,
    SentRequest: <SentRequest user={user} />,
  };
  return (
    <div className=" p-4 w-full sm:w-[250px] rounded-xl flex flex-col bg-slate-200 shadow-lg items-center justify-center gap-5">
      {/* Avatar and name */}
      <div className="flex    gap-5 items-center sm:flex-col ">
        <div className="avatar">
          <div className="w-32">
            <img src={user.profile || defaultImg} className="rounded-full " />
          </div>
        </div>
        <span className="flex flex-col sm:flex-row sm:gap-2">
          <h1 className="font-bold text-lg">{user?.fName}</h1>

          <h1 className="text-lg font-bold">{user?.lName}</h1>
        </span>
      </div>

      <p className="text-lg text-gray-500 line-clamp-1 mx-2 font-normal sm:text-sm">
        {user.email}
      </p>
      {displayComponent[display]}
    </div>
  );
};

const Friends = ({ user }: { user: IChatRoom }) => {
  const dispatch = useAppDispatch();

  function handleClick(room: IChatRoom) {
    dispatch(setCurrentRoom(room));
  }
  return (
    <Link to={"/chat"}>
      <button
        className="btn  btn-ghost"
        onClick={() => {
          handleClick(user);
        }}
      >
        <AiFillMessage size={30} color="pink" />
        Message
      </button>
    </Link>
  );
};

const AllPeoples = ({ user }: { user: IChatRoom }) => {
  const [sendFriendRequest] = useSendFriendRequestMutation();

  async function handleAddFriend(id: string) {
    await sendFriendRequest({
      to: id,
    });
  }

  return (
    <button
      className="  btn btn-sm btn-outline btn-info"
      onClick={() => {
        handleAddFriend(user.id);
      }}
    >
      Add <IoIosPersonAdd size={15} color="skyblue" />
    </button>
  );
};

const FriendReq = ({ user }: { user: IUser }) => {
  const [acceptFriendReq] = useAcceptFriendReqMutation();
  const [deleteSentRequest] = useDeleteSentRequestMutation();
  const loggedInUser = useAppSelector((store) => store.user);
  async function acceptReqHandler(from: string) {
    await acceptFriendReq({ fromId: from });
  }
  return (
    <div className="flex items-center gap-5">
      <button
        className="bg-slate-300 text-blue-700  rounded-lg hover:bg-slate-500 hover:text-white transition-all"
        onClick={() => {
          acceptReqHandler(user.id);
        }}
      >
        <TiTick size={35} />
      </button>
      <button
        className=" text-red-700 rounded-lg bg-slate-300 hover:bg-slate-500 hover:text-white transition-all"
        onClick={() => {
          deleteSentRequest({
            fromId: user.id,
            toId: loggedInUser.user?.id as string,
            receiverId: user.id,
          });
        }}
      >
        <TiDelete size={35} />
      </button>
    </div>
  );
};
const SentRequest = ({ user }: { user: IUser }) => {
  const [deleteSentRequest] = useDeleteSentRequestMutation();
  const loggedInUser = useAppSelector((store) => store.user);

  async function handleCancelReq(to: string) {
    await deleteSentRequest({
      fromId: loggedInUser.user?.id || "",
      toId: to,
      receiverId: to,
    });
  }
  return (
    <button
      className="btn btn-outline btn-error btn-sm"
      onClick={() => {
        handleCancelReq(user.id);
      }}
    >
      Cancel <AiFillDelete size={15} color="red" />
    </button>
  );
};

export default FriendCard;
