import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../redux";
import { IUser } from "../../types";
import FriendCard from "./FriendCard";
import { getNumberOfRequiredPagination } from "../../utils";

function AllPeoples(props: { search: string }) {
  const [paginationArray, setPaginationArray] = useState<number[]>([]);

  const maximumNumberOfPagination = 6;
  const numberOfContentPerPage = 10;
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error, refetch } = useGetAllUsersQuery({
    order: "asc",
    page: page,
    take: numberOfContentPerPage,
    search: props.search,
  });
  const NumberofPages = data?.totalUsers
    ? data.totalUsers / numberOfContentPerPage
    : 0;
  const totalNumberofPages = Math.ceil(NumberofPages);

  useEffect(() => {
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
  }, [page, refetch, totalNumberofPages, props.search, data?.totalUsers]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      refetch();
    }, 3000);

    return () => {
      clearTimeout(debounce);
    };
  }, [props.search, refetch]);

  useEffect(() => {
    for (let i = 1; i <= maximumNumberOfPagination; i++) {
      setPaginationArray(getNumberOfRequiredPagination(totalNumberofPages));
    }
  }, [data?.totalUsers, setPaginationArray, totalNumberofPages]);

  function handleClickOnPageNumber(pageNumber: number) {
    setPage(pageNumber);
  }

  return (
    <>
      {error ? (
        <>
          No users found.
          <button
            className="btn btn-outline btn-primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            Try again
          </button>
        </>
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
