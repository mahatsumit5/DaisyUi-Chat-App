import YourFriends from "../components/Friends/Friends";

function Friends() {
  return (
    <div className="flex flex-col  w-full  gap-5">
      <h1 className="text-3xl  text-base-content font-bold font-sans ">
        Friends
      </h1>

      <div className="flex gap-2 px-3">
        <button className="btn  bg-primary text-primary-content">
          <span className="bg-base-200 px-2 py-1 text-base-content rounded-lg text-xs">
            1
          </span>
          Active
        </button>
        <button className="btn  border-2 border-primary text-primary">
          <span className="bg-primary px-2 py-1 text-primary-content rounded-lg text-xs">
            24
          </span>
          Inactive
        </button>
      </div>

      <div className="flex-1 rounded-xl flex flex-col  overflow-y-auto w-full bg-base-100 p-4">
        <YourFriends />
      </div>
    </div>
  );
}

export default Friends;
