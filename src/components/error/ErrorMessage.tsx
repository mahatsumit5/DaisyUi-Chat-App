import { Link } from "react-router-dom";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="text-2xl font-bold">No rooms available</p>
      <p className="text-sm">Create a room to start chatting</p>

      <Link to={"/friend-request"}>
        <button className="btn btn-primary  w-full">Find Friends</button>
      </Link>
    </div>
  );
};

export default ErrorMessage;
