import { AiTwotoneMessage } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hook";
import { IChatRoom } from "../../types";
import { setCurrentRoom } from "../../redux/reducer/room.slice";
import { useNavigate } from "react-router-dom";

const ActivePeople = () => {
  const { onlineUsers } = useAppSelector((store) => store.onlineUsers);
  const { chatRoom } = useAppSelector((store) => store.rooms);

  return (
    <>
      {chatRoom.map((item, index) => {
        if (item.email === onlineUsers[index]) {
          return <OnlineUser user={item} key={item.id} />;
        } else {
          return null;
        }
      })}
    </>
  );
};

const OnlineUser = ({ user }: { user: IChatRoom }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleOnMessage() {
    dispatch(setCurrentRoom(user));
    navigate("/chat");
  }

  return (
    <div className="flex gap-5 items-center justify-between w-full mt-2">
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <span className="font-semibold flex-1">
        {user.fName} {user.lName}
      </span>

      <button
        className="btn btn-outline btn-primary  btn-md"
        onClick={handleOnMessage}
      >
        <AiTwotoneMessage size={25} /> Message
      </button>
    </div>
  );
};
export default ActivePeople;
