import { useGetListOfFriendsQuery } from "../../redux/api"
import { User } from "../../types/types"
import ErrorMessage from "../error/ErrorMessage"
import FriendCard from "./FriendCard"

function YourFriends() {
  const { data, isLoading, error } = useGetListOfFriendsQuery()
  return (
    <div className="flex flex-col gap-2 w-full">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <section className="bg-slate-300 h-full rounded-xl p-4 flex flex-col gap-5 overflow-y-auto animate-pulse" />
      ) : data?.allFriends?.data!.length ? (
        <div className="flex justify-start flex-wrap gap-8 w-full ">
          {data?.allFriends?.data.map(user => (
            <FriendCard user={user as User} type="friends" key={user.id} />
          ))}
        </div>
      ) : (
        <ErrorMessage />
      )}
    </div>
  )
}

export default YourFriends
