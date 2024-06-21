import Sidebar from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";

function MobileDrawer() {
  return (
    <div className={`flex  justify-start`}>
      <div className=" sm:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn-square drawer-button">
            <RxHamburgerMenu size={30} className="text-primary" />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className=" py-8 w-56 min-h-full  bg-base-100 flex flex-col justify-between items-center">
            <Sidebar />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileDrawer;
