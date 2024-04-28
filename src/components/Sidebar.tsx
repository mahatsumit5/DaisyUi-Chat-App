import { PiStarFourFill } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";
import { CgMail } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
function Sidebar() {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl text-white sm:flex flex-col justify-between w-24 items-center hidden ">
      <div>
        <PiStarFourFill size={35} color="red" />
      </div>
      <div className=" h-44 flex flex-col gap-10 flex-1 justify-center  w-full items-center">
        <CgMail size={30} />
        <TiMessages size={30} color="red" />
        <IoMdNotificationsOutline size={30} />
        <RiDeleteBin5Line size={30} />
      </div>
      <div>
        <div>avatar</div>
      </div>
    </div>
  );
}

export default Sidebar;
