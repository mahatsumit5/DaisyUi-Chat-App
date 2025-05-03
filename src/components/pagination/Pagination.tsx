import { useEffect, useState } from "react"
import { getNumberOfRequiredPagination } from "../../utils"
import { useAppDispatch, useAppSelector } from "../../hooks/hook"
import { setCurrentPage, Type } from "../../redux/reducer/pagination.slice"

type PaginationProps = {
  numberOfContentPerPage: number
  totalNumberOfAvaibleContent: number
}
function Pagination({
  numberOfContentPerPage,
  totalNumberOfAvaibleContent,
}: PaginationProps) {
  const dispatch = useAppDispatch()
  const { users } = useAppSelector(store => store.pagination)
  const [paginationArray, setPaginationArray] = useState<number[]>([])
  const totalNumberofPages = Math.ceil(
    totalNumberOfAvaibleContent
      ? totalNumberOfAvaibleContent / numberOfContentPerPage
      : 0
  )
  const page = users.currentPage

  useEffect(() => {
    setPaginationArray(getNumberOfRequiredPagination(totalNumberofPages))
  }, [totalNumberofPages])
  //   content is grater than miminum amount to displaying content
  return totalNumberOfAvaibleContent > numberOfContentPerPage ? (
    <div className="flex justify-center flex-col items-center gap-2">
      <span>
        page {page} of {totalNumberofPages}
      </span>
      <div className="join">
        <button
          className="join-item btn btn-square btn-primary disabled:text-white"
          onClick={() => {
            dispatch(
              setCurrentPage({
                currentPage: users.currentPage - 1,
                type: Type.User,
              })
            )
          }}
          disabled={page === 1}
        >
          PREV
        </button>

        {paginationArray
          .sort(function (a, b) {
            return a - b
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
                  dispatch(
                    setCurrentPage({
                      currentPage: users.currentPage - 1,
                      type: Type.User,
                    })
                  )
                }}
              >
                {item}
              </button>
            )
          })}

        <button
          className="join-item btn btn-square btn-primary "
          onClick={() => {
            dispatch(
              setCurrentPage({
                currentPage: users.currentPage - 1,
                type: Type.User,
              })
            )
          }}
          disabled={page === totalNumberofPages}
        >
          NEXT
        </button>
      </div>
    </div>
  ) : null
}

export default Pagination
