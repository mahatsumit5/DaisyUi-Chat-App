import { useGetFriendRequestQuery } from "../../redux";
import { IUser } from "../../types";

import AllPeoples from "./AllPeoples";
import FriendCard from "./FriendCard";
import MobileDrawer from "../MobileDrawer";

function FriendReq() {
  const { data, error, isLoading } = useGetFriendRequestQuery(null);
  console.log(data);
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <MobileDrawer />
          <h1 className="text-xl md:text-4xl font-bold text-black">
            Friend Request
          </h1>
          {error ? (
            <p>You do not have any friend request</p>
          ) : (
            <>
              {isLoading ? (
                <>isLoading</>
              ) : (
                <>
                  {data?.data.result.length ? (
                    <div className="flex justify-start flex-wrap gap-5">
                      {data?.data.result.map((item, index) => (
                        <FriendCard
                          type="request"
                          user={item.from as IUser}
                          key={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>You do not have any friend Request</p>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-xl md:text-4xl font-bold text-black">
            Find new People
          </h1>
          <AllPeoples />
        </div>
      </div>
    </>
  );
}

export default FriendReq;
