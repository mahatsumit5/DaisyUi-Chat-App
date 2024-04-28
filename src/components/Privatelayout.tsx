import { useAppSelector } from "../hook";
import { Navigate, useLocation } from "react-router-dom";

function Privatelayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAppSelector((store) => store.user);
  console.log(user?.id);
  if (user?.id) {
    return children;
  } else {
    <Navigate to={"/"} state={{ from: { location } }} />;
  }
}

export default Privatelayout;
