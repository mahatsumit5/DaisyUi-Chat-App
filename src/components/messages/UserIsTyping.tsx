import { GoDotFill } from "react-icons/go";
import { useAppSelector } from "../../hook";

const UserIsTyping = () => {
  const { isTyping } = useAppSelector((store) => store.socket);
  const { currentRoom } = useAppSelector((store) => store.rooms);
  console.log(isTyping);
  return isTyping ? (
    <div className="flex flex-col gap-2 mt-5">
      <div className="flex">
        <div className="bg-black h-8 rounded-full w-8">
          <img
            src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
            className="object-cover overflow-hidden h-8 w-8 rounded-full"
          />
        </div>
        <span className="  w-14 rounded-full flex justify-center items-center h-7">
          <GoDotFill className="animate-bounce" />
          <GoDotFill className="animate-bounce" />
          <GoDotFill className="animate-bounce" />
        </span>
      </div>
      <span>{currentRoom?.fName} is typing</span>
    </div>
  ) : null;
};

export default UserIsTyping;
