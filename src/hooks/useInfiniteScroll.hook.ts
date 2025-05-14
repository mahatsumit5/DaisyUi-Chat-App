import { useEffect } from "react"
import { useAppDispatch } from "./hook"
import { setCurrentPage, Type } from "../redux/reducer/pagination.slice"

function useInfiniteScroll(
  currentPage: number,
  query: any,
  args?: any,
  options?: any
) {
  const dispatch = useAppDispatch()
  const { isError, isFetching, data } = query(args, options)
  useEffect(() => {
    const handleScrollEnd = () => {
      // Get the scroll position
      const scrollPosition = window.scrollY + window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight

      // If the user is at the bottom of the page, load more posts and
      if (scrollPosition >= scrollHeight - 100 && !isFetching) {
        dispatch(
          setCurrentPage({ type: Type.Post, currentPage: currentPage + 1 })
        ) // Increment the page number for fetching the next set of posts
      }
    }

    window.addEventListener("scroll", handleScrollEnd)
    return () => {
      window.removeEventListener("scroll", handleScrollEnd)
    }
  }, [dispatch, currentPage, isFetching])
  return { isError, isFetching, data }
}

export default useInfiniteScroll
