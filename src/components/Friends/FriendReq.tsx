import { Dispatch, SetStateAction } from "react";
import { useGetFriendRequestQuery } from "../../redux";
import FriendCard from "./FriendCard";
import { IUser } from "../../types";

function FriendReq({
  setDisplay,
}: {
  setDisplay: Dispatch<SetStateAction<"people" | "friends" | "Request">>;
}) {
  const { data, error, isLoading } = useGetFriendRequestQuery(null);

  return (
    <>
      {error ? (
        <div className="flex items-center justify-center flex-col gap-5">
          <p className="text-2xl  font-serif font-bold text-black">
            You do not have any friend request.
          </p>
          <button
            className="btn btn-primary text-white"
            onClick={() => {
              setDisplay("people");
            }}
          >
            Find People
          </button>
        </div>
      ) : isLoading ? (
        <>loading</>
      ) : data ? (
        <div className="flex justify-between flex-wrap flex-row">
          {data.data.map((item, index) => (
            <FriendCard type="request" user={item.from as IUser} key={index} />
          ))}
        </div>
      ) : null}
    </>
  );
  // : (
  //
  // );
}

export default FriendReq;
