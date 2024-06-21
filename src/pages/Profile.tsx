import { useLogoutUserMutation } from "../redux";
import { useAppDispatch, useAppSelector } from "../hook";
import { setUser } from "../redux/reducer/user.slice";
import { FaLock } from "react-icons/fa";

function ProfilePage() {
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout() {
    await logoutUser();

    sessionStorage.clear();
    localStorage.clear();
    dispatch(setUser(null));
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between md:justify-end w-full items-center">
        <button className="btn btn-primary text-white" onClick={handleLogout}>
          <FaLock size={20} /> Logout
        </button>
      </div>

      <div className=" flex items-start justify-center">
        <div className="w-80 rounded-full mt-10">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <span className="flex gap-3">
          <p className="text-2xl font-semibold text-base-content">
            {user?.fName}
          </p>
          <p className="text-2xl font-semibold text-base-content">
            {user?.lName}
          </p>
        </span>

        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
          magni ullam? Illo, ducimus.
        </span>
        <p className="text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
