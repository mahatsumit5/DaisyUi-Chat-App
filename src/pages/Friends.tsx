import YourFriends from "../components/Friends/Friends";
import MobileDrawer from "../components/MobileDrawer";

function Friends() {
  return (
    <div className="flex flex-col  w-full md:px-5 px-2 gap-5">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl text-gray-800 font-bold font-serif hidden md:block">
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

      <div className="flex gap-2 p-4">
        <button className="bg-blue-200/45 p-2 rounded-md text-blue-600 flex gap-2 items-center hover:bg-blue-200">
          <span className="bg-blue-600 px-2 py-1 text-white rounded-lg text-xs">
            1
          </span>
          Active
        </button>
        <button className="bg-gray-300/45 p-2 rounded-md text-gray-500 flex gap-2 items-center hover:bg-gray-300">
          <span className="bg-gray-500/80 px-2 py-1 text-white rounded-lg text-xs">
            24
          </span>
          Inactive
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto mt-5 ">
        <YourFriends />
      </div>
    </div>
  );
}

export default Friends;
