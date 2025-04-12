import { useGetAllUsersQuery } from "../../redux/api"
import { useAppSelector } from "../../hooks/hook"
import LoaderCard from "./LoaderCard"
import FriendCard from "./FriendCard"
import Pagination from "../pagination/Pagination"
import { Order, User } from "../../types/types"

function AllPeoples() {
  const numberOfContentPerPage = 8
  const { page } = useAppSelector(store => store.pagination)
  const { query } = useAppSelector(store => store.search)

  const { data, error, isFetching } = useGetAllUsersQuery(
    {
      params: {
        order: Order.Asc,
        page,
        take: 8,
        search: query,
      },
    },
    {
      // skip: type !== "Peoples" ? true : false,
      // refetchOnReconnect: true,
      // refetchOnMountOrArgChange: true,
      // pollingInterval: 2000, refetch every 2 seconds
    }
  )

  return (
    <>
      {error ? (
        <>
          <p>No users found.</p>
          <button
            className="btn btn-outline btn-primary w-36"
            onClick={() => {
              window.location.reload()
            }}
          >
            Try again
          </button>
        </>
      ) : isFetching ? (
        <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
          {Array(10)
            .fill("")
            .map(() => (
              <LoaderCard key={Math.random()} />
            ))}
        </div>
      ) : data?.allUsers?.data?.length ? (
        <div className="flex flex-col gap-5">
          <div className="flex justify-around flex-wrap gap-5 w-full">
            {data.allUsers.data.map(user => (
              <FriendCard user={user as User} type="peoples" key={user.id} />
            ))}
          </div>
          <Pagination
            numberOfContentPerPage={numberOfContentPerPage}
            totalNumberOfAvaibleContent={data.allUsers?.totalUsers!}
          />
        </div>
      ) : null}
    </>
  )
}

export default AllPeoples
