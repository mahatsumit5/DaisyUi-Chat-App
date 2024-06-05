import { useState } from "react";
import AllPeoples from "../components/Friends/AllPeoples";
import FriendReq from "../components/Friends/FriendReq";
import YourFriends from "../components/Friends/Friends";
import { IoPeopleCircle } from "react-icons/io5";
import { TiUserAddOutline } from "react-icons/ti";
import { TbUserSearch } from "react-icons/tb";
import MobileDrawer from "../components/MobileDrawer";

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
    <div className="flex flex-col  w-full md:px-5">
      <div className="flex w-full justify-between items-center">
        <MobileDrawer />
        <input
          type="text"
          className="bg-white rounded-md p-2"
          placeholder="Search"
        />
      </div>
      <h1 className="text-3xl text-gray-800 font-bold font-serif mt-10">
        {display.toUpperCase()}
      </h1>
      <div className="w-full flex justify-start gap-5 flex-wrap mt-5">
        <button
          className="btn btn-primary text-white w-24"
          onClick={() => setDisplay("friends")}
        >
          <IoPeopleCircle size={25} />
        </button>
        <button
          className="btn btn-primary text-white w-24"
          onClick={() => setDisplay("people")}
        >
          <TbUserSearch size={25} />
        </button>
        <button
          className="btn btn-primary text-white w-24"
          onClick={() => setDisplay("Request")}
        >
          <TiUserAddOutline size={25} />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto mt-5 ">
        {displayComponent[display]}
      </div>
    </div>
  );
}

export default Friends;
