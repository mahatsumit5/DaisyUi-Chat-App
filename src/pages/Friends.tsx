import { useState } from "react";
import AllPeoples from "../components/Friends/AllPeoples";
import FriendReq from "../components/Friends/FriendReq";
import YourFriends from "../components/Friends/Friends";

function Friends() {
  const [display, setDisplay] = useState<"people" | "friends" | "Request">(
    "friends"
  );
  const displayComponent = {
    people: <AllPeoples />,
    friends: <YourFriends />,
    Request: <FriendReq />,
  };
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
        <button
          className="w-full bg-gray-400 text-white rounded-lg p-2 text-lg font-semibold"
          onClick={() => setDisplay("friends")}
        >
          Your Friends
        </button>
        <button
          className="w-full bg-gray-400 text-white rounded-lg p-2 text-lg font-semibold"
          onClick={() => setDisplay("people")}
        >
          Find New Friends
        </button>
        <button
          className="w-full bg-gray-400 text-white rounded-lg p-2 text-lg font-semibold"
          onClick={() => setDisplay("Request")}
        >
          Friend Request
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto mt-5">
        {displayComponent[display]}
      </div>
    </div>
  );
}

export default Friends;
