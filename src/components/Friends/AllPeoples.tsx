import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IAllUsersResponse, IUser } from "../../types";
import FriendCard from "./FriendCard";
import LoaderCard from "./LoaderCard";
import { SerializedError } from "@reduxjs/toolkit";
import Pagination from "../pagination/Pagination";

type AllPeoplesProps = {
  search: string;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching: boolean;
  data: IAllUsersResponse;
  numberOfContentPerPage: number;
};
function AllPeoples({
  error,
  data,
  isFetching,
  numberOfContentPerPage,
}: AllPeoplesProps) {
  return (
    <>
      {error ? (
        <>
          <p>No users found.</p>
          <button
            className="btn btn-outline btn-primary w-36"
            onClick={() => {
              window.location.reload();
            }}
          >
            Try again
          </button>
        </>
      ) : isFetching ? (
        <div className="flex flex-row flex-wrap gap-5 justify-center w-full">
          {Array(10)
            .fill("")
            .map(() => (
              <LoaderCard key={Math.random()} />
            ))}
        </div>
      ) : data.data.length ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-row flex-wrap gap-5 justify-around w-full">
            {data.data.map((user: IUser) => (
              <FriendCard user={user} type="peoples" key={user.id} />
              // <LoaderCard />
            ))}
          </div>
          <Pagination
            numberOfContentPerPage={numberOfContentPerPage}
            totalNumberOfAvaibleContent={data.totalUsers}
          />
        </div>
      ) : null}
    </>
  );
}

export default AllPeoples;
