import { useGetSentFriendRequestQuery } from "../../graphql/queries/request.generated"
import { useAppSelector } from "../../hooks/hook"
import { IUser } from "../../types"
import Pagination from "../pagination/Pagination"
import FriendCard from "./FriendCard"
import LoaderCard from "./LoaderCard"

const SentRequest = () => {
  const { query, type } = useAppSelector(store => store.search)
  const { users } = useAppSelector(store => store.pagination)

  const { isFetching, error, data } = useGetSentFriendRequestQuery(
    {
      page: users.currentPage,
      search: query,
      take: 10,
    },
    {
      skip: type !== "Sent-Request" ? true : false,
      // refetchOnMountOrArgChange: true,
      // refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  )

  return (
    <>
      {error ? (
        <p>You do not have any friend request</p>
      ) : (
        <>
          {isFetching ? (
            <div className="flex justify-around flex-wrap gap-5">
              {Array(10)
                .fill("")
                .map(() => (
                  <LoaderCard key={Math.random()} />
                ))}
            </div>
          ) : (
            <>
              {data?.getSentFriendRequest?.data?.length ? (
                <div className="flex flex-col gap-5 ">
                  <div className="flex justify-around flex-wrap gap-5 w-full">
                    {data?.getSentFriendRequest.data.map((item, index) => (
                      <FriendCard
                        type="SentRequest"
                        user={item.to as IUser}
                        key={index}
                      />
                    ))}
                  </div>

                  <Pagination
                    numberOfContentPerPage={7}
                    totalNumberOfAvaibleContent={
                      data.getSentFriendRequest.count!
                    }
                  />
                </div>
              ) : (
                <p>You do not have any friend Request</p>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default SentRequest
