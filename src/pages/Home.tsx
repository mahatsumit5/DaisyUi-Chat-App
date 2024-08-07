import Alert from "../components/Alert/Alert";
import HomeAllUsers from "../components/Friends/HomeAllUsers";
import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import PostLoading from "../components/post/PostLoading";
import { useGetAllUsersQuery, useGetPostsQuery } from "../redux";

const Home = () => {
  const { isError, isFetching, data: posts } = useGetPostsQuery(null);
  const {
    isLoading,
    isError: usersError,
    data: users,
  } = useGetAllUsersQuery({ order: "asc", page: 1, take: 10, search: "" });
  return (
    <div className=" h-full flex ">
      <div className={`p-2 w-full lg:w-full flex flex-col gap-3   border-r-2 `}>
        <CreatePost />
        {isError ? (
          <Alert message="Error occured while fetching posts" />
        ) : (
          <div className="flex flex-col gap-4">
            {isFetching
              ? Array(5)
                  .fill("")
                  .map((item, index) => <PostLoading key={index} />)
              : posts?.map((item) => <PostCard post={item} key={item.id} />)}
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
