import { TiMessages, TiUserAddOutline } from "react-icons/ti"
import { IoIosSettings, IoMdNotificationsOutline } from "react-icons/io"
import { BsPeople } from "react-icons/bs"
import { Link, useLocation } from "react-router-dom"
import { useAppDispatch } from "../hooks/hook"
import { resetSearchBar, setQueryType } from "../redux/reducer/search.slice"
import { IoHomeOutline } from "react-icons/io5"

const links = [
  {
    id: 0,
    text: "Home",
    link: "/home",
    icon: <IoHomeOutline size={18} />,
  },
  {
    id: 1,
    text: "Messages",
    link: "/chat",
    icon: <TiMessages size={18} />,
  },
  {
    id: 2,
    text: "Notification",
    link: "/notification",
    icon: <IoMdNotificationsOutline size={18} />,
  },
  {
    id: 3,
    text: "Friends",
    link: "/friends",
    icon: <BsPeople size={18} />,
  },

  {
    id: 5,
    text: "Request",
    link: "/friend-request",
    icon: <TiUserAddOutline size={18} />,
  },
  {
    id: 6,
    text: "Settings",
    link: "/settings",
    icon: <IoIosSettings size={18} />,
  },
]
function Sidebar() {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  function handleClick(name: string) {
    dispatch(resetSearchBar())
    if (name === "Messages" || name === "Friends") {
      dispatch(setQueryType(name))
      return
    }
  }
  return (
    <div className=" flex flex-col gap-2  py-2   justify-start items-center ">
      {links.map(link => (
        <Link to={link.link} key={link.id}>
          <button
            className={`relative w-36 btn-sm btn-square flex px-2${
              pathname === link.link
                ? " bg-primary rounded-lg text-primary-content scale-110 transition-all duration-200 shadow-md"
                : "text-base-content"
            }   flex gap-2 items-center justify-start font-semibold `}
            onClick={() => {
              handleClick(link.text)
            }}
          >
            {link.icon}
            <p className="font-sans hover:underline "> {link.text}</p>
            {link.text === "Request" && (
              <span className="text-primary  rounded-badge absolute -right-2 -top-2">
                {/* {data?.data.friendReqCount} */}
              </span>
            )}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
