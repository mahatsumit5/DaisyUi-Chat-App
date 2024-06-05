import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../redux";
import { useAppDispatch } from "../hook";
import { setUser } from "../redux/reducer/user.slice";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout() {
    const { status } = await logoutUser().unwrap();
    console.log(status);
    if (status) {
      sessionStorage.clear();
      localStorage.clear();
      dispatch(setUser(null));
      navigate("/");
    }
  }
  return (
    <div>
      <button className="btn btn-info" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
}

export default ProfilePage;
