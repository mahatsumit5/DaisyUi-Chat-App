import { TiDelete, TiTick } from "react-icons/ti";
import { useAppSelector } from "../../hook";

function FriendReq() {
  const { friendReq } = useAppSelector((store) => store.friendRequest);

  async function acceptFriendReq() {}

  async function rejectFriendReq() {}
  return (
    <>
      {friendReq.map((item, index) => (
        <div
          className="flex bg-white  rounded-lg mt-4 p-2 justify-between"
          key={index}
        >
          {/* profile and name */}
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
              <h1 className="text-black font-bold text-sm">
                {item.from.fName}
              </h1>
              &nbsp;
              <h1 className="text-black font-bold text-sm">
                {item.from.lName}
              </h1>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button className="bg-slate-300 text-blue-700  rounded-lg hover:bg-slate-500 hover:text-white transition-all">
              <TiTick size={35} />
            </button>
            <button className=" text-red-700 rounded-lg bg-slate-300 hover:bg-slate-500 hover:text-white transition-all">
              <TiDelete size={35} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default FriendReq;
