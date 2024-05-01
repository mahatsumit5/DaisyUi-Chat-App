import { FaHamburger } from "react-icons/fa";
import Sidebar from "./Sidebar";

function MobileDrawer() {
  return (
    <div className="drawer sm:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Sidebar />
        <label htmlFor="my-drawer" className="btn-square drawer-button">
          <FaHamburger size={25} color="blue" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MobileDrawer;
