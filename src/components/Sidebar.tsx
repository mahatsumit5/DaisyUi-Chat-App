import { PiStarFourFill } from "react-icons/pi";
import { TiMessages, TiUserAddOutline } from "react-icons/ti";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { TbUserSearch } from "react-icons/tb";
import { useGetFriendRequestQuery } from "../redux";
import { useAppSelector } from "../hook";

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
    text: "Friends",
    link: "/friends",
    icon: <TbUserSearch size={35} />,
  },
  {
    id: 4,
    text: "Active",
    link: "/online-users",
    icon: <BsPeople size={35} />,
  },
  {
    id: 5,
    text: "Request",
    link: "/friend-request",
    icon: <TiUserAddOutline size={35} />,
  },
];
function Sidebar() {
  const { pathname } = useLocation();
  const { data } = useGetFriendRequestQuery(null);
  const { user } = useAppSelector((s) => s.user);

  return (
    <>
      <div>
        <PiStarFourFill size={35} color="red" />
      </div>
      <div className=" h-44 flex flex-col gap-10 flex-1 justify-center  w-full items-center">
        {links.map((link) => (
          <Link to={link.link} key={link.id}>
            <button
              className={`relative ${
                pathname === link.link
                  ? "text-red-500 bg-slate-700  rounded-lg"
                  : "text-slate-300"
              } flex gap-2 items-center font-semibold p-2`}
            >
              {link.icon} <p className="block "> {link.text}</p>
              {link.text === "Request" && (
                <span className="text-white  rounded-badge absolute -right-2 -top-2">
                  {data?.data.friendReqCount}
                </span>
              )}
            </button>
          </Link>
        ))}
      </div>
      <div className="bg-slate-500/15 p-2 rounded-lg">
        <Link to={"/profile"} className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <p>
            {user?.fName}&nbsp;{user?.lName}
          </p>
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
