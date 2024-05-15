import { useAppSelector } from "../../hook";

function YourFriends() {
  const { friends } = useAppSelector((store) => store.currentRoom);
  return (
    <div className="flex flex-col gap-2">
      {friends.length ? (
        <>
          {friends.map((user) => (
            <div
              className="flex border-b-black p-3 bg-white rounded-lg justify-between"
              key={user?.id}
            >
              {/* Avatar and name */}
              <div className="flex gap-4">
                <div className="avatar">
                  <div className="w-12">
                    <img
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
