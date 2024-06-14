import { useGetAllUsersQuery } from "../../redux";
import { IUser } from "../../types";
import FriendCard from "./FriendCard";

function AllPeoples() {
  const { data, isLoading, error } = useGetAllUsersQuery();

  return (
    <>
      {error ? (
        <>Unexpected error occures. Please try again later</>
      ) : isLoading ? (
        <></>
      ) : data ? (
        <>
          <div className="flex flex-row flex-wrap gap-8 justify-evenly ">
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
