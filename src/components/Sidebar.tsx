import { TiMessages, TiUserAddOutline } from "react-icons/ti";
import { IoIosSettings, IoMdNotificationsOutline } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useGetFriendRequestQuery } from "../redux";
import { useAppSelector } from "../hook";
import icon from "../assets/images/icon.png";

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
    icon: <BsPeople size={31} />,
  },

  {
    id: 5,
    text: "Request",
    link: "/friend-request",
    icon: <TiUserAddOutline size={35} />,
  },
  {
    id: 6,
    text: "Settings",
    link: "/settings",
    icon: <IoIosSettings size={35} />,
  },
];
function Sidebar() {
  const { pathname } = useLocation();
  const { data } = useGetFriendRequestQuery(null);
  const { user } = useAppSelector((s) => s.user);

  return (
    <>
      <div className="flex">
        <span className=" w-16 ">
          <img src={icon} className="object-cover" />
        </span>
      </div>
      <div className=" h-44 flex flex-col gap-4 flex-1 justify-center  w-full items-center">
        {links.map((link) => (
          <Link to={link.link} key={link.id}>
            <button
              className={`relative w-48 ${
                pathname === link.link
                  ? " bg-primary rounded-lg text-primary-content"
                  : ""
              }  text-base-content flex gap-2 items-center justify-start font-semibold p-2`}
            >
              {link.icon} <p className="block "> {link.text}</p>
              {link.text === "Request" && (
                <span className="text-primary  rounded-badge absolute -right-2 -top-2">
                  {data?.data.friendReqCount}
                </span>
              )}
            </button>
          </Link>
        ))}
      </div>
      <div className="bg-primary/80 w-full text-primary-content p-2 rounded-lg">
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
