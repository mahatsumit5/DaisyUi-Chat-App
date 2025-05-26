import Alert from "../components/Alert/Alert"
import HomeAllUsers from "../components/Friends/HomeAllUsers"
import CreatePost from "../components/post/CreatePost"
import PostCard from "../components/post/PostCard"
import PostLoading from "../components/post/PostLoading"
import {
  useGetAllPostsQuery,
  useGetAllUsersQuery,
  useGetListOfFriendsQuery,
} from "../redux/api"
import { useAppDispatch, useAppSelector } from "../hooks/hook"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IPost, IUser } from "../types"
import { Order } from "../types/types"
import { setCurrentPage, Type } from "../redux/reducer/pagination.slice"
import useInfiniteScroll from "../hooks/useInfiniteScroll.hook"
const Home = () => {
  const [position, setPostion] = useState((window.innerWidth - 1280) / 2)
  const dispatch = useAppDispatch()
  const { post, users: allUsers } = useAppSelector(store => store.pagination)

  const { query } = useAppSelector(store => store.search)

  // const {
  //   isError,
  //   isFetching: fetchingPost,
  //   data: posts,
  // } = useGetAllPostsQuery(
  //   { args: { page: post.currentPage, take: 10 } },
  //   {
  //     refetchOnMountOrArgChange: true,
  //     refetchOnReconnect: true,
  //   }
  // )

  // const {
  //   data: posts,
  //   isError,
  //   isFetching: fetchingPost,
  // } = useInfiniteScroll<InputMaybe<GetAllPostArgs>>(
  //   post.currentPage,
  //   useGetAllPostsQuery,
  //   {
  //     args: { page: post.currentPage, take: 10 },
  //   },
  //   { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  //   )

  const {
    data: posts,
    isError,
    isFetching: fetchingPost,
  } = useGetAllPostsQuery({
    args: {
      page: post.currentPage,
      take: 10,
    },
  })

  const {
    isLoading,
    isError: usersError,
    data: users,
  } = useGetAllUsersQuery({
    params: {
      page: allUsers.currentPage,
      take: 10,
      search: query,
      order: Order.Asc,
    },
  })

  const {
    isError: friendError,
    isLoading: friendLoading,
    data: friends,
  } = useGetListOfFriendsQuery()
  // const {
  //   data: friends,
  //   isError: friendError,
  //   isFetching: friendLoading,
  // } = useInfiniteScroll<{ [key: string]: never }>(2, useGetListOfFriendsQuery)
  useEffect(() => {
    const handlOnResize = () => {
      const newPosition = (window.innerWidth - 1280) / 2
      if (newPosition > 0) {
        setPostion(newPosition)
      } else {
        setPostion(5)
      }
    }
    window.addEventListener("resize", handlOnResize)
    return () => {
      window.removeEventListener("resize", handlOnResize)
    }
  }, [])

  useEffect(() => {
    const handleScrollEnd = () => {
      // Get the scroll position
      const scrollPosition = window.scrollY + window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight

      // If the user is at the bottom of the page, load more posts and
      if (scrollPosition >= scrollHeight - 100 && !fetchingPost) {
        dispatch(
          setCurrentPage({ type: Type.Post, currentPage: post.currentPage + 1 })
        ) // Increment the page number for fetching the next set of posts
      }
    }

    window.addEventListener("scroll", handleScrollEnd)
    return () => {
      window.removeEventListener("scroll", handleScrollEnd)
    }
  }, [dispatch, post.currentPage, fetchingPost])

  return (
    <div className=" h-full flex   ">
      <div className={` px-2 w-full  flex flex-col gap-3   `}>
        <CreatePost />

        {isError ? (
          <Alert message="Error occured while fetching posts" />
        ) : (
          <div className="flex flex-col gap-4  ">
            {fetchingPost && post.currentPage === 1
              ? Array(5)
                  .fill("")
                  .map((item, index) => <PostLoading key={index} />)
              : posts?.data?.posts?.map(item => (
                  <PostCard post={item as IPost} key={item.id} />
                ))}
            {fetchingPost && post.currentPage !== post.totalPages ? (
              <div className="w-full h-20 flex flex-col items-center justify-center">
                Fetching post...
                <span className="h-5 w-5  border-x-primary border-y-white border-2 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="flex items-center justify-center py-3 flex-col">
                <span className="font-sans"> End Reached</span>
                <button
                  className="btn btn-outline btn-primary btn-sm"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                >
                  Go to top
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Side Bar */}
      <div
        className="hidden lg:flex  lg:w-[350px]   w-full    "
        style={{ right: position }}
      >
        <div className="flex flex-col gap-4 w-full px-2">
          <span className="mx-2 text-sm font-bold">Friends</span>

          {friendError ? (
            <>No Friends Available</>
          ) : friendLoading ? (
            <>Loading....</>
          ) : (
            <div className="max-h-60 overflow-y-auto flex flex-col gap-2 bg-base-100 rounded-lg py-4 ">
              {friends?.allFriends?.data?.length ? (
                friends?.allFriends.data.map(item => (
                  <HomeAllUsers
                    key={item.id}
                    user={{
                      email: item.email,
                      fName: item.fName,
                      id: item.id,
                      lName: item.lName,
                      profile: item.profile!,
                      isActive: item.isActive,
                    }}
                    type="friends"
                    room={{
                      email: item.email,
                      fName: item.fName,
                      id: item.id,
                      lName: item.lName,
                      profile: item.profile!,
                      isActive: item.isActive,
                      userId: item.id,
                      isLastMessageSeen: true,
                      lastMessage: "",
                      unSeenMessageCount: 2,
                      lastmessageAuthor: "",
                    }}
                  />
                ))
              ) : (
                <span className="flex flex-col gap-5">
                  <p className="text-base-content font-poppins font-semibold">
                    You do not have any friends.
                  </p>
                  <Link to={"/friends"}>
                    <button className="btn btn-primary btn-outline">
                      Find Friends
                    </button>
                  </Link>
                </span>
              )}
            </div>
          )}
          <span className="mx-2 text-sm font-bold">People you may know</span>
          {usersError ? (
            <>Error occured</>
          ) : isLoading ? (
            Array(5)
              .fill("")
              .map((item, index) => <PostLoading key={index} />)
          ) : (
            <div className=" max-h-60 overflow-y-auto flex flex-col gap-2 bg-base-100 rounded-lg py-4 ">
              {users?.allUsers?.data &&
                users.allUsers.data.map(user => (
                  <HomeAllUsers
                    key={user.id}
                    user={user as IUser}
                    type="users"
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      {/* img Viewing box */}
    </div>
  )
}

export default Home
