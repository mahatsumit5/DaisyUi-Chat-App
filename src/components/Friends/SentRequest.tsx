import { useGetSentFriendRequestQuery } from "../../redux";
import { IUser } from "../../types";
import Pagination from "../pagination/Pagination";
import FriendCard from "./FriendCard";
import LoaderCard from "./LoaderCard";

const SentRequest = () => {
  const { isFetching, error, data } = useGetSentFriendRequestQuery({
    search: "",
    skip: 0,
  });

  return (
    <>
      {error ? (
        <p>You do not have any friend request</p>
      ) : (
        <>
          {isFetching ? (
            <div className="flex justify-around flex-wrap gap-5">
              {Array(3)
                .fill("")
                .map(() => (
                  <LoaderCard key={Math.random()} />
                ))}
            </div>
          ) : (
            <>
              {data?.data.length ? (
                <div className="flex flex-col gap-5 ">
                  <div className="flex justify-around flex-wrap gap-5 w-full">
                    {data?.data.map((item, index) => (
                      <FriendCard
                        type="SentRequest"
                        user={item.to as IUser}
                        key={index}
                      />
                    ))}
                  </div>

                  <Pagination
                    numberOfContentPerPage={10}
                    totalNumberOfAvaibleContent={data.data.length}
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
  );
};

export default SentRequest;
