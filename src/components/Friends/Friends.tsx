import { useAppDispatch, useAppSelector } from "../../hook";
import defaultImg from "../../assets/images/default-profile.jpg";
import { AiFillMessage } from "react-icons/ai";
import { IChatRoom } from "../../types";
import { getMessageAction } from "../../action/message.action";
import { Link } from "react-router-dom";

function YourFriends() {
  const dispatch = useAppDispatch();

  function handleClick(room: IChatRoom) {
    dispatch(getMessageAction(room, 15));
  }
  const { chatRoom } = useAppSelector((store) => store.rooms);
  return (
    <div className="flex flex-col gap-2">
      {chatRoom.length ? (
        <>
          {chatRoom.map((user) => (
            <div
              className="flex border-b-black p-3 bg-white rounded-lg justify-between"
              key={user?.id}
            >
              {/* Avatar and name */}
              <div className="flex gap-4">
                <div className="avatar">
                  <div className="w-12">
                    <img
                      src={user.profile || defaultImg}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <span className="flex">
                  <h1 className="text-black font-bold text-sm">
                    {user?.fName}
                  </h1>
                  &nbsp;
                  <h1 className="text-black font-bold text-sm">
                    {user?.lName}
                  </h1>
                </span>
              </div>
              {/* buttonss */}
              <div className="flex">
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
              </div>
            </div>
          ))}
        </>
      ) : (
        <>No Friends</>
      )}
      <div></div>
    </div>
  );
}

export default YourFriends;
