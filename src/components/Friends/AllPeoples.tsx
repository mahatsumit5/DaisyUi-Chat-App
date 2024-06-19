import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../redux";
import { IUser } from "../../types";
import FriendCard from "./FriendCard";
import { getNumberOfRequiredPagination } from "../../utils";

function AllPeoples() {
  const [paginationArray, setPaginationArray] = useState<number[]>([]);

  const maximumNumberOfPagination = 6;
  const numberOfContentPerPage = 10;
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error, refetch } = useGetAllUsersQuery({
    order: "asc",
    page: page,
    take: numberOfContentPerPage,
    search: "",
  });
  const NumberofPages = data?.totalUsers
    ? data.totalUsers / numberOfContentPerPage
    : 0;
  const totalNumberofPages = Math.ceil(NumberofPages);

  useEffect(() => {
    refetch();

    if (page > maximumNumberOfPagination) {
      setPaginationArray((previousArray) => {
        if (page > previousArray[previousArray.length - 1]) {
          return previousArray.map((num) => num + 1);
        } else {
          return previousArray.map((num) => num - 1);
        }
      });
    } else {
      for (let i = 1; i <= maximumNumberOfPagination; i++) {
        setPaginationArray((previous) => {
          if (previous.includes(i)) return [...previous];
          // temporary solved
          // make dynamic
          return getNumberOfRequiredPagination(totalNumberofPages);
        });
      }
    }
  }, [page, refetch, totalNumberofPages]);

  function handleClickOnPageNumber(pageNumber: number) {
    setPage(pageNumber);
  }

  // useEffect(() => {
  //   fillArray();
  // }, []);

  return (
    <>
      {error ? (
        <>Unexpected error occures. Please try again later</>
      ) : isLoading ? (
        <></>
      ) : data ? (
        <>
          <div className="flex flex-row flex-wrap gap-5 justify-center ">
            {data.data.map((user: IUser) => (
              <FriendCard user={user} type="peoples" key={user.id} />
            ))}
          </div>

          <div className="flex justify-center">
            <div className="join">
              <button
                className="join-item btn btn-square btn-primary disabled:text-white"
                onClick={() => {
                  setPage((previousState) => previousState - 1);
                }}
                disabled={page === 1}
              >
                PREV
              </button>

              {paginationArray
                .sort(function (a, b) {
                  return a - b;
                })
                .map((item, index) => {
                  return (
                    <button
                      className={`join-item btn btn-outline ${
                        page === item ? "bg-primary" : ""
                      } `}
                      key={index}
                      value={item}
                      onClick={() => {
                        handleClickOnPageNumber(item);
                      }}
                    >
                      {item}
                    </button>
                  );
                })}

              <button
                className="join-item btn btn-square btn-primary "
                onClick={() => {
                  setPage((previousState) => previousState + 1);
                }}
                disabled={page === totalNumberofPages}
              >
                NEXT
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default AllPeoples;
