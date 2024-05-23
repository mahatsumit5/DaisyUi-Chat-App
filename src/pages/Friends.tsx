import { useState } from "react";
import AllPeoples from "../components/Friends/AllPeoples";
import FriendReq from "../components/Friends/FriendReq";
import YourFriends from "../components/Friends/Friends";
import { IoPeopleCircle } from "react-icons/io5";
import { TiUserAddOutline } from "react-icons/ti";
import { TbUserSearch } from "react-icons/tb";

function Friends() {
  const [display, setDisplay] = useState<"people" | "friends" | "Request">(
    "friends"
  );
  const displayComponent = {
    people: <AllPeoples />,
    friends: <YourFriends />,
    Request: <FriendReq setDisplay={setDisplay} />,
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
          className="btn btn-primary text-white "
          onClick={() => setDisplay("friends")}
        >
          <IoPeopleCircle size={25} /> Friends
        </button>
        <button
          className="btn btn-primary text-white "
          onClick={() => setDisplay("people")}
        >
          <TbUserSearch size={25} /> Find New Friends
        </button>
        <button
          className="btn btn-primary text-white "
          onClick={() => setDisplay("Request")}
        >
          <TiUserAddOutline size={25} /> Friend Request
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto mt-5">
        {displayComponent[display]}
      </div>
    </div>
  );
}

export default Friends;
