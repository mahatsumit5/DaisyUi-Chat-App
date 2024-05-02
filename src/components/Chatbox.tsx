import { PiTelegramLogoFill } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
function Chatbox() {
  // const { _id } = useAppSelector((store) => store.currentRoom);
  const [message, setMessage] = useState<string>("");

  function handleSend() {
    setMessage("");
  }
  return (
    <div className="flex flex-col gap-2 w-full h-full">
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
      <section className="bg-white  rounded-xl p-4 flex flex-col gap-5 overflow-y-auto flex-1"></section>
      <section className=" h-11   flex  gap-2 ">
        <input
          className="w-full h-full p-3 rounded-xl bg-white"
          placeholder="Write your message "
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          className="bg-red-600  flex justify-center items-center rounded-xl w-14"
          onClick={handleSend}
        >
          <PiTelegramLogoFill color="white" size={20} />
        </button>
      </section>
    </div>
  );
}

export default Chatbox;
