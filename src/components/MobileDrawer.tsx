import { FaHamburger } from "react-icons/fa";
import Sidebar from "./Sidebar";

function MobileDrawer() {
  return (
    <div className=" sm:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn-square drawer-button">
          <FaHamburger size={25} color="blue" />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className=" py-8 w-40 min-h-full   bg-slate-900 flex flex-col justify-between items-center">
          <Sidebar />
        </ul>
      </div>
    </div>
  );
}

export default MobileDrawer;
