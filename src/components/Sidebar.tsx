import { PiStarFourFill } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";
import { CgMail } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl text-white sm:flex flex-col justify-between w-24 items-center hidden ">
      <div>
        <PiStarFourFill size={35} color="red" />
      </div>
      <div className=" h-44 flex flex-col gap-10 flex-1 justify-center  w-full items-center">
        <button>
          <CgMail size={30} />
        </button>
        <Link to={"/chat"}>
          <button>
            <TiMessages size={30} color="red" />
          </button>
        </Link>

        <Link to={"/notification"}>
          <button>
            <IoMdNotificationsOutline size={30} />
          </button>
        </Link>

        <Link to={"/friends"}>
          <button>
            <BsPeople size={30} />
          </button>
        </Link>
      </div>
      <div>
        <div>avatar</div>
      </div>
    </div>
  );
}

export default Sidebar;
