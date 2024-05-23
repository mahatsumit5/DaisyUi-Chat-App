import { PiStarFourFill } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";
import { CgMail } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <>
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
        <Link to={"/profile"}>
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
