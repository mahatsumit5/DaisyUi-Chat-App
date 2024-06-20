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
  const { data, error, refetch, isFetching } = useGetAllUsersQuery({
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
      ) : isFetching ? (
        <div className="flex flex-row flex-wrap gap-5 justify-center ">
          {Array(10)
            .fill("")
            .map(() => (
              <LoaderCard key={Math.random()} />
            ))}
        </div>
      ) : data ? (
        <>
          <div className="flex flex-row flex-wrap gap-5 justify-center ">
            {data.data.map((user: IUser) => (
              <FriendCard user={user} type="peoples" key={user.id} />
              // <LoaderCard />
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

const LoaderCard = () => {
  return (
    <div className="flex flex-col gap-4 w-52 bg-gray-100 rounded-xl h-56 items-center justify-between p-4 ">
      <div className="skeleton w-24 h-24 bg-slate-300 rounded-full shrink-0"></div>{" "}
      <div className="skeleton h-2 w-28 bg-slate-300"></div>
      <div className="skeleton h-2 w-full bg-slate-300"></div>
      <div className="skeleton h-8 w-28 bg-slate-300"></div>
    </div>
  );
};
export default AllPeoples;
