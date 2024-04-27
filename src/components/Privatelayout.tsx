import { useAppSelector } from "../hook";
import { Navigate } from "react-router-dom";

function Privatelayout({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((store) => store.user);
  if (user?.id) {
    return children;
  } else {
    <Navigate to={"/"} />;
  }
}

export default Privatelayout;
