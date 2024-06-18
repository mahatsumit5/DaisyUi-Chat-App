import { Link } from "react-router-dom";
import { IChatRoom, ISentReq, IUser } from "../../types";
import { AiFillDelete, AiFillMessage } from "react-icons/ai";
import defaultImg from "../../assets/images/default-profile.jpg";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import {
  useAcceptFriendReqMutation,
  useDeleteSentRequestMutation,
  useGetAllChatRoomQuery,
  useGetFriendRequestQuery,
  useGetSentFriendRequestQuery,
  useSendFriendRequestMutation,
} from "../../redux";
import { TiDelete, TiTick } from "react-icons/ti";
import { setCurrentRoom } from "../../redux/reducer/room.slice";
type keys = "peoples" | "friends" | "request";

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
  };
  return (
    <div className=" p-2 w-full sm:w-[250px] rounded-xl flex flex-col bg-gray-100 shadow-lg items-center justify-center gap-5">
      {/* Avatar and name */}
      <div className="flex gap-4">
        <div className="avatar">
          <div className="w-40">
            <img
              src={user.profile || defaultImg}
              className="rounded-full shadow-xl"
            />
          </div>
        </div>
      </div>
      <span className="flex">
        <h1 className="   text-xl">{user?.fName}</h1>
        &nbsp;
        <h1 className="text-xl">{user?.lName}</h1>
      </span>
      <p>{user.email}</p>
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
  const { socket } = useAppSelector((store) => store.socket);
  const loggedInUser = useAppSelector((store) => store.user);
  const { data, refetch } = useGetSentFriendRequestQuery(null);
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [deleteSentRequest] = useDeleteSentRequestMutation();
  function handleAddFriend(id: string) {
    sendFriendRequest({ userId: id })
      .unwrap()
      .then(() => {
        refetch();

        socket.emit(
          "friend_request_notification",
          id,
          loggedInUser.user?.email
        );
      })
      .catch((err) => console.log(err));
  }
  function sentReqCheck(email: string): boolean {
    if (!data) return false;
    const result = data.data.find((item: ISentReq) => item.to.email === email);
    if (result?.to) {
      return true;
    } else {
      return false;
    }
  }

  async function handleCancelReq(to: string) {
    deleteSentRequest({
      fromId: loggedInUser.user?.id || "",
      toId: to,
    });
    refetch();
  }
  return (
    <div className="flex">
      {sentReqCheck(user.email) ? (
        <button
          className="btn btn-outline btn-error"
          onClick={() => {
            handleCancelReq(user.id);
          }}
        >
          Cancel <AiFillDelete size={20} color="red" />
        </button>
      ) : (
        <button
          className="  btn btn-outline btn-primary "
          onClick={() => {
            handleAddFriend(user.id);
          }}
        >
          Add Friend <IoIosPersonAdd size={20} color="skyblue" />
        </button>
      )}
    </div>
  );
};

const FriendReq = ({ user }: { user: IUser }) => {
  const { refetch } = useGetAllChatRoomQuery();
  const { socket } = useAppSelector((store) => store.socket);
  const friendReqQuery = useGetFriendRequestQuery(null);
  const [acceptFriendReq] = useAcceptFriendReqMutation();
  const [deleteSentRequest] = useDeleteSentRequestMutation();
  const loggedInUser = useAppSelector((store) => store.user);
  function acceptReqHandler(from: string) {
    acceptFriendReq({ fromId: from })
      .unwrap()
      .then(() => {
        refetch();
        socket.emit("friend_request_accepted", from);
      });
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
          });
          friendReqQuery.refetch();
        }}
      >
        <TiDelete size={35} />
      </button>
    </div>
  );
};

export default FriendCard;
