import Alert from "../components/Alert/Alert";
import HomeAllUsers from "../components/Friends/HomeAllUsers";
import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import PostLoading from "../components/post/PostLoading";
import { useGetAllUsersQuery, useGetPostsQuery } from "../redux";
import { useAppDispatch, useAppSelector } from "../hook";
import { setSkip } from "../redux/reducer/post.slice";
import { LoadingButton } from "../components";
import { useRef } from "react";

const Home = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const { skip } = useAppSelector((state) => state.post);
  const { isError, isLoading: loading, data: posts } = useGetPostsQuery(skip);
  const {
    isLoading,
    isError: usersError,
    data: users,
  } = useGetAllUsersQuery({ order: "asc", page: 1, take: 10, search: "" });
  // useEffect(() => {
  //   console.log(skip);
  //   if (posts?.totalNumberOfPosts - skip < 4) return;
  //   const handleScroll = () => {
  //     // Calculate the scroll position
  //     const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //     const scrollHeight = document.documentElement.scrollHeight;
  //     const clientHeight = document.documentElement.clientHeight;
  //     // Check if scrolled to the bottom
  //     if (scrollTop + clientHeight >= scrollHeight - 4) {
  //       // -1 for a little buffer

  //       dispatch(setSkip(skip + 4));
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [dispatch, skip, posts?.totalNumberOfPosts]);
  return (
    <div className=" h-full flex ">
      <div className={`p-2 w-full lg:w-full flex flex-col gap-3   border-r-2 `}>
        <CreatePost />
        {isError ? (
          <Alert message="Error occured while fetching posts" />
        ) : (
          <div className="flex flex-col gap-4">
            {loading
              ? Array(5)
                  .fill("")
                  .map((item, index) => <PostLoading key={index} />)
              : posts?.posts?.map((item) => (
                  <PostCard post={item} key={item.id} />
                ))}
            <button
              ref={btnRef}
              className="btn btn-sm btn-primary"
              onClick={() => {
                dispatch(setSkip(skip + 4));
                btnRef.current?.scrollIntoView();
              }}
              disabled={(posts?.totalNumberOfPosts as number) - skip < 4}
            >
              {loading ? <LoadingButton /> : "Show More"}
            </button>
          </div>
        )}
      </div>
      {/* Side Bar */}
      <div className="hidden lg:flex  lg:w-[350px]  py-4  h-full    ">
        {usersError ? (
          <>Error occured</>
        ) : isLoading ? (
          Array(5)
            .fill("")
            .map((item, index) => <PostLoading key={index} />)
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {users?.data.map((user) => (
              <HomeAllUsers key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
