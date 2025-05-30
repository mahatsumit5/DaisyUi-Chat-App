import { FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hook"
import MobileDrawer from "../MobileDrawer"
import { setQuery } from "../../redux/reducer/search.slice"
import { Link } from "react-router-dom"
import { useLogoutMutation } from "../../redux/api"
import { setUser } from "../../redux/reducer/user.slice"
import { useSocket } from "../../hooks/socket.hook"
import icon from "../../assets/images/icon.png"
import { Avatar } from "../Avatar/Avatar"
import { extractInitial } from "../../utils"

const NavBar = () => {
  const { currentRoom } = useAppSelector(store => store.rooms)
  const { user } = useAppSelector(store => store.user)
  const { query } = useAppSelector(s => s.search)
  const dispatch = useAppDispatch()
  const [logoutUser] = useLogoutMutation()
  const socket = useSocket()

  async function handleLogout() {
    const { data } = await logoutUser({ email: user?.email! }).unwrap()
    if (data?.status) {
      sessionStorage.clear()
      localStorage.clear()
      dispatch(setUser(null))
      window.location.reload()
      socket.close()
    }
  }
  return (
    <header className="sticky w-full top-0 z-50  shadow-md bg-base-100 ">
      <div
        className={`navbar     max-w-7xl mx-auto  ${
          currentRoom?.id ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="flex-1 p-2 flex gap-2">
          <span className="hidden md:block">
            <img src={icon} className="" alt="logo" height={25} width={25} />
          </span>
          <p className="font-bold hidden md:block text-xl text-primary font-courgette ">
            Chat App
          </p>
          <MobileDrawer />
        </div>
        <div className="flex-none gap-2">
          <label className="input input-sm bg-primary  items-center gap-2 flex justify-between text-primary-content ">
            <input
              type="text"
              placeholder="Search"
              onChange={(e: FormEvent<HTMLInputElement>) => {
                dispatch(setQuery({ query: e.currentTarget.value }))
              }}
              className="text-[16px] text-primary-content placeholder:text-primary-content/70"
              value={query}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 hover:scale-125 hover:cursor-pointer transition-all"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <Avatar
                initial={extractInitial(user?.fName || "", user?.lName || "")}
                url={user?.profile as string}
                classname="w-10"
              />
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[20] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"}>
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/settings"}>Settings</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
