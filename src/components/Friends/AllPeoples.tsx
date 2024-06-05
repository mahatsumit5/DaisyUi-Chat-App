import { useGetAllUsersQuery } from "../../redux-slice/api";
import { IUser } from "../../types";
import FriendCard from "./FriendCard";

function AllPeoples() {
  const { data, isLoading, error } = useGetAllUsersQuery();

  return (
    <>
      {error ? (
        <>Error</>
      ) : isLoading ? (
        <></>
      ) : data ? (
        <>
          <div className="flex flex-row flex-wrap gap-8 justify-between px-4">
            {data.map((user: IUser) => (
              <FriendCard user={user} type="peoples" key={user.id} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

export default AllPeoples;
