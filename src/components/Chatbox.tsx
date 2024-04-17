import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
function Chatbox() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <header className="bg-white w-full rounded-xl p-3 flex justify-between">
        <div className="flex gap-3">
          <div className="avatar online">
            <div className="w-14 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-black font-bold text-sm">Sumit mahat</p>
            <p className="text-sm">Online</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <button className="btn  rounded-full btn-sm">Profile</button>
          <button className="btn btn-neutral rounded-full btn-sm">Call</button>
          <div className="divider divider-horizontal" />
          <button className="">
            <CiSearch />
          </button>
          <button>
            <IoIosMore />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Chatbox;
