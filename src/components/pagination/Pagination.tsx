import { useEffect, useState } from "react";
import { getNumberOfRequiredPagination } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hook";
import { setPage } from "../../redux/reducer/pagination.slice";

type PaginationProps = {
  numberOfContentPerPage: number;
  totalNumberOfAvaibleContent: number;
};
function Pagination({
  numberOfContentPerPage,
  totalNumberOfAvaibleContent,
}: PaginationProps) {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((store) => store.pagination);
  const [paginationArray, setPaginationArray] = useState<number[]>([]);
  const totalNumberofPages = Math.ceil(
    totalNumberOfAvaibleContent
      ? totalNumberOfAvaibleContent / numberOfContentPerPage
      : 0
  );

  //   useEffect(() => {
  //     // 6 is maximum number of pagination
  //     if (page > 6) {
  //       setPaginationArray((previousArray) => {
  //         if (page > previousArray[previousArray.length - 1]) {
  //           return previousArray.map((num) => num + 1);
  //         } else {
  //           return previousArray.map((num) => num - 1);
  //         }
  //       });
  //     } else {
  //       for (let i = 1; i <= 6; i++) {
  //         setPaginationArray((previous) => {
  //           if (previous.includes(i)) return [...previous];
  //           // temporary solved
  //           // make dynamic
  //           return getNumberOfRequiredPagination(totalNumberofPages);
  //         });
  //       }
  //     }
  //   }, [page, totalNumberofPages]);

  useEffect(() => {
    setPaginationArray(getNumberOfRequiredPagination(totalNumberofPages));
  }, [totalNumberofPages]);
  //   content is grater than miminum amount to displaying content
  return totalNumberOfAvaibleContent > numberOfContentPerPage ? (
    <div className="flex justify-center">
      <div className="join">
        <button
          className="join-item btn btn-square btn-primary disabled:text-white"
          onClick={() => {
            dispatch(setPage(page - 1));
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
                  page === item ? "bg-primary text-white" : ""
                } `}
                key={index}
                value={item}
                onClick={() => {
                  dispatch(setPage(item));
                }}
              >
                {item}
              </button>
            );
          })}

        <button
          className="join-item btn btn-square btn-primary "
          onClick={() => {
            dispatch(setPage(page + 1));
          }}
          disabled={page === totalNumberofPages}
        >
          NEXT
        </button>
      </div>
    </div>
  ) : null;
}

export default Pagination;
