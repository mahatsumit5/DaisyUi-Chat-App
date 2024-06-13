import YourFriends from "../components/Friends/Friends";
import MobileDrawer from "../components/MobileDrawer";

function Friends() {
  return (
    <div className="flex flex-col  w-full md:px-5">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl text-gray-800 font-bold font-serif ">
          Friends
        </h1>
        <MobileDrawer />
        <input
          type="text"
          className="bg-white rounded-md p-2"
          placeholder="Search"
        />
      </div>
      <h1 className="text-3xl md:hidden text-gray-800 font-bold font-serif mt-10">
        Friends
      </h1>

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto mt-10">
        <YourFriends />
      </div>
    </div>
  );
}

export default Friends;
