import { IUser } from "../../types";

import { useGetAllUsersQuery } from "../../redux";
import { useAppSelector } from "../../hook";
import LoaderCard from "./LoaderCard";
import FriendCard from "./FriendCard";
import Pagination from "../pagination/Pagination";

function AllPeoples() {
  const numberOfContentPerPage = 8;
  const { page } = useAppSelector((store) => store.pagination);
  const { query, type } = useAppSelector((store) => store.search);

  const { data, error, isFetching } = useGetAllUsersQuery(
    {
      order: "asc",
      page: page,
      take: numberOfContentPerPage,
      search: query,
    },
    {
      skip: type !== "Peoples" ? true : false,
      refetchOnReconnect: true,
      // refetchOnMountOrArgChange: true,
      // pollingInterval: 2000, refetch every 2 seconds
    }
  );
  console.log(data);
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
        <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
          {Array(10)
            .fill("")
            .map(() => (
              <LoaderCard key={Math.random()} />
            ))}
        </div>
      ) : data?.data.length ? (
        <div className="flex flex-col gap-5">
          <div className="flex justify-around flex-wrap gap-5 w-full">
            {data.data.map((user: IUser) => (
              <FriendCard user={user} type="peoples" key={user.id} />
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
