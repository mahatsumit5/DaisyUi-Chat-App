import { IoIosPersonAdd } from "react-icons/io";
import { useAppSelector } from "../hook";

function Friends() {
  const friends = useAppSelector((state) => state.allUsers);
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-lg text-black font-bold">Find new Friends</h1>
        <input
          type="text"
          className="bg-white rounded-md p-2"
          placeholder="Search"
        />
      </div>
      <div className="w-full flex justify-between gap-1">
        <button className="w-full bg-gray-400 text-white rounded-lg p-2 text-lg font-semibold">
          Your Friends
        </button>
        <button className="w-full bg-gray-400 text-white rounded-lg p-2 text-lg font-semibold">
          Find New Friends
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto mt-5">
        {friends.map((user) => (
          <div className="flex border-b-black p-3 bg-white rounded-lg justify-between">
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
              <button className="">
                <IoIosPersonAdd size={30} color="grey" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;
