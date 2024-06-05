import { PiStarFourFill } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    id: 1,
    text: "Messages",
    link: "/chat",
    icon: <TiMessages size={35} />,
  },
  {
    id: 2,
    text: "Notification",
    link: "/notification",
    icon: <IoMdNotificationsOutline size={35} />,
  },
  {
    id: 3,
    text: "Peoples",
    link: "/friends",
    icon: <BsPeople size={35} />,
  },
];
function Sidebar() {
  const { pathname } = useLocation();
  return (
    <>
      <div>
        <PiStarFourFill size={35} color="red" />
      </div>
      <div className=" h-44 flex flex-col gap-10 flex-1 justify-center  w-full items-center">
        {links.map((link) => (
          <Link to={link.link} key={link.id}>
            <button
              className={`${
                pathname === link.link ? "text-red-500 " : "text-slate-300"
              } flex gap-2 items-center font-semibold`}
            >
              {link.icon} <p className="block sm:hidden"> {link.text}</p>
            </button>
          </Link>
        ))}
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
