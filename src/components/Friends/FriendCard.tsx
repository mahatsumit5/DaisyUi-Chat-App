import { Link } from "react-router-dom";
import { IChatRoom, IFriendReq, IUser } from "../../types";
import { AiFillDelete, AiFillMessage } from "react-icons/ai";
import defaultImg from "../../assets/images/default-profile.jpg";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import {
  useAcceptFriendReqMutation,
  useDeleteSentRequestMutation,
  useGetSentFriendRequestQuery,
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
    <div className=" flex-1 w-full sm:w-[250px] md:rounded-lg md:border-none flex md:flex-col border-b-2 md:bg-base-300 border-b-primary bg-base-100 md:p-4   items-center justify-around gap-4  md:shadow-lg  py-2">
      {/* Avatar and name */}
      <div className="avatar ">
        <div className="w-16 h-full md:w-24">
          <img src={user.profile || defaultImg} className="rounded-full " />
        </div>
      </div>
      <span className="flex  sm:flex-row gap-1">
        <h1 className="text-base">{user?.fName}</h1>

        <h1 className="text-base ">{user?.lName}</h1>
      </span>

      <p className="text-lg text-gray-500 line-clamp-1 mx-2 font-normal sm:text-sm hidden md:block">
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
        className="btn   btn-primary"
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
  const loggedInUser = useAppSelector((store) => store.user);
  const { data } = useGetSentFriendRequestQuery({ search: "", page: 1 });
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [deleteSentRequest] = useDeleteSentRequestMutation();
  const { page } = useAppSelector((store) => store.pagination);
  function handleAddFriend(id: string) {
    sendFriendRequest({ to: id, page })
      .unwrap()
      .then(() => {})
      .catch((err) => console.log(err));
  }
  function sentReqCheck(email: string): boolean {
    if (!data) return false;
    const result = data.data.find(
      (item: IFriendReq) => item.to.email === email
    );
    if (result?.to) {
      return true;
    } else {
      return false;
    }
  }

  async function handleCancelReq(to: string) {
    await deleteSentRequest({
      fromId: loggedInUser.user?.id || "",
      toId: to,
      receiverId: to,
      type: "sent",
    });
  }
  return (
    <div className="flex">
      {sentReqCheck(user.email) ? (
        <button
          className="btn btn-outline btn-error btn-sm"
          onClick={() => {
            handleCancelReq(user.id);
          }}
        >
          Cancel <AiFillDelete size={15} color="red" />
        </button>
      ) : (
        <button
          className="  btn btn-sm  btn-primary"
          onClick={() => {
            handleAddFriend(user.id);
          }}
        >
          Add <IoIosPersonAdd size={15} className="text-primary-content" />
        </button>
      )}
    </div>
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
    <div className="flex  gap-2">
      <button
        className="btn btn-sm btn-circle btn-success"
        onClick={() => {
          acceptReqHandler(user.id);
        }}
      >
        <TiTick size={30} />
      </button>
      <button
        className="btn btn-sm btn-circle btn-error  items-center "
        onClick={() => {
          deleteSentRequest({
            fromId: user.id,
            toId: loggedInUser.user?.id as string,
            receiverId: user.id,
            type: "received",
          });
        }}
      >
        <TiDelete size={30} className="text-white" />
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
      type: "sent",
    });
  }
  return (
    <button
      className="btn text-error-content btn-error btn-sm"
      onClick={() => {
        handleCancelReq(user.id);
      }}
    >
      Cancel <AiFillDelete size={15} className="text-error-content" />
    </button>
  );
};

export default FriendCard;
