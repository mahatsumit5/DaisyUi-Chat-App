import { useAppSelector } from "../../hook";
import defaultImg from "../../assets/images/default-profile.jpg";

function YourFriends() {
  const { chatRoom } = useAppSelector((store) => store.currentRoom);
  return (
    <div className="flex flex-col gap-2">
      {chatRoom.length ? (
        <>
          {chatRoom.map((user) => (
            <div
              className="flex border-b-black p-3 bg-white rounded-lg justify-between"
              key={user?.id}
            >
              {/* Avatar and name */}
              <div className="flex gap-4">
                <div className="avatar">
                  <div className="w-12">
                    <img
                      src={user.profile || defaultImg}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <span className="flex">
                  <h1 className="text-black font-bold text-sm">
                    {user?.fName}
                  </h1>
                  &nbsp;
                  <h1 className="text-black font-bold text-sm">
                    {user?.lName}
                  </h1>
                </span>
              </div>
              {/* buttonss */}
              <div className="flex">
                <button>Message</button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>No Friends</>
      )}
      <div></div>
    </div>
  );
}

export default YourFriends;
