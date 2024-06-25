import { useAppSelector } from "../hook";

function ProfilePage() {
  const { user } = useAppSelector((store) => store.user);

  return (
    <div className="flex flex-col gap-5 w-full">
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
