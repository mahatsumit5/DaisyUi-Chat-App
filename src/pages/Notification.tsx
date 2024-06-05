import { Link } from "react-router-dom";

function Notification() {
  return (
    <div className="flex  justify-start w-full flex-col ">
      <Link to={"/chat"} className="flex-1">
        Go back
      </Link>
      <p className="text-2xl font-bold flex-1  flex justify-center">
        Comming Soon.......
      </p>
    </div>
  );
}

export default Notification;
