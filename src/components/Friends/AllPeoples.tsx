import { MdOutlineDeleteForever } from "react-icons/md";
import {
  deleteFriendReqAction,
  sendFriendReqAction,
} from "../../action/friendReq.actions";
import { useAppDispatch, useAppSelector } from "../../hook";
import { IoIosPersonAdd } from "react-icons/io";

function AllPeoples() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);
  const friends = useAppSelector((state) => state.allUsers);
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
    dispatch(deleteFriendReqAction(user.id!, to));
  }

  return (
    <>
      {friends.map((user) => (
        <div
          className="flex border-b-black p-3 bg-white rounded-lg justify-between"
          key={user.id}
        >
          {/* Avatar and name */}
          <div className="flex gap-4">
            <div className="avatar">
              <div className="w-12">
                <img
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
                className="flex font-bold bg-red-400 hover:bg-red-600 w-24 justify-between items-center px-2 rounded-lg text-white"
                onClick={() => {
                  handleCancelReq(user.id);
                }}
              >
                Cancel <MdOutlineDeleteForever size={30} color="white" />
              </button>
            ) : (
              <button
                className="flex justify-between px-2 w-24 font-bold bg-blue-400 hover:bg-blue-600 rounded-lg text-white items-center"
                onClick={() => {
                  handleAddFriend(user.id);
                }}
              >
                Add <IoIosPersonAdd size={30} color="white" />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default AllPeoples;
