import { useGetFriendRequestQuery } from "../../redux";
import { IUser } from "../../types";
import Pagination from "../pagination/Pagination";

import FriendCard from "./FriendCard";
import LoaderCard from "./LoaderCard";

function FriendReq() {
  const { data, error, isLoading } = useGetFriendRequestQuery(null);

  return (
    <>
      {error ? (
        <p>You do not have any friend request</p>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-around flex-wrap gap-5">
              {Array(3)
                .fill("")
                .map(() => (
                  <LoaderCard key={Math.random()} />
                ))}
            </div>
          ) : (
            <>
              {data?.data.result.length ? (
                <div className="flex flex-col gap-5 w-full bg-primary">
                  <div className="flex justify-around flex-wrap gap-5 ">
                    {data?.data.result.map((item, index) => (
                      <FriendCard
                        type="request"
                        user={item.from as IUser}
                        key={index}
                      />
                    ))}
                  </div>

                  <Pagination
                    numberOfContentPerPage={4}
                    totalNumberOfAvaibleContent={data.data.friendReqCount}
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
}

export default FriendReq;
