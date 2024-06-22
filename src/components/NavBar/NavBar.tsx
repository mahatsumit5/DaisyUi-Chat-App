import { useAppSelector } from "../../hook";
import MobileDrawer from "../MobileDrawer";

const NavBar = () => {
  const { currentRoom } = useAppSelector((store) => store.rooms);

  return (
    <div
      className={`navbar bg-base-100 rounded-md ${
        currentRoom?.id ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-xl hidden md:block">Chat App</a>
        <MobileDrawer />
      </div>
      <div className="flex-none gap-2">
        <label className="input input-sm md:input-md bg-primary  items-center gap-2 flex justify-between">
          <input
            type="text"
            placeholder="Search"
            // onChange={handleSearch}
            className="text-[16px] text-primary-content"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
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
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
