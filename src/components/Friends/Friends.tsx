import { useGetAllChatRoomQuery } from "../../redux";
import ErrorMessage from "../error/ErrorMessage";
import FriendCard from "./FriendCard";

function YourFriends() {
  const { data, error, isLoading } = useGetAllChatRoomQuery({
    search: "",
    page: 1,
    take: 10,
  });

  return (
    <div className="flex flex-col gap-2">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <section className="bg-slate-300 h-full rounded-xl p-4 flex flex-col gap-5 overflow-y-auto animate-pulse" />
      ) : data?.data.length ? (
        <div className="flex gap-5  w-full flex-wrap">
          {data.data.map((user) => (
            <FriendCard user={user} type="friends" key={user.id} />
          ))}
        </div>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
}

export default YourFriends;
