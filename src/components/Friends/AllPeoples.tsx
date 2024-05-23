import {
  deleteFriendReqAction,
  sendFriendReqAction,
} from "../../action/friendReq.actions";
import { useAppDispatch, useAppSelector } from "../../hook";
import { IoIosPersonAdd } from "react-icons/io";
import defaultImg from "../../assets/images/default-profile.jpg";
import { AiFillDelete } from "react-icons/ai";
import { IUser } from "../../types";
import { setCurrentUser } from "../../redux-slice/room.slice";
import { toggleDialog } from "../../redux-slice/dialog.slice";

function AllPeoples() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);
  const { allUsers } = useAppSelector((state) => state.allUsers);
  const { sentReq } = useAppSelector((state) => state.friendRequest);

  async function handleAddFriend(id: string) {
    dispatch(sendFriendReqAction({ userId: id }));
  }
  function sentReqCheck(email: string): boolean {
    const result = sentReq.find((item) => item.to.email === email);
    if (result?.to) {
      return true;
    } else {
      return false;
    }
  }

  async function handleCancelReq(to: string) {
    dispatch(deleteFriendReqAction(user?.id || "", to));
  }
  function handleClick(user: IUser) {
    dispatch(setCurrentUser(user));
    dispatch(toggleDialog());
  }
  return (
    <>
      {allUsers.map((user) => (
        <div
          className="flex border-b-black p-3 bg-white rounded-lg justify-between"
          key={user.id}
        >
          {/* Avatar and name */}
          <div className="flex gap-4" onClick={() => handleClick(user)}>
            <div className="avatar">
              <div className="w-12">
                <img
                  src={user.profile || defaultImg}
                  className="rounded-full"
                />
              </div>
            </div>
            <span className="flex">
              <h1 className="text-black font-bold text-sm">{user.fName}</h1>
              &nbsp;
              <h1 className="text-black font-bold text-sm">{user.lName}</h1>
            </span>
          </div>
          {/* buttonss */}
          <div className="flex">
            {sentReqCheck(user.email) ? (
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  handleCancelReq(user.id);
                }}
              >
                <AiFillDelete size={30} color="red" />
              </button>
            ) : (
              <button
                className="  btn btn-sm btn-ghost"
                onClick={() => {
                  handleAddFriend(user.id);
                }}
              >
                <IoIosPersonAdd size={30} color="skyblue" />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default AllPeoples;
