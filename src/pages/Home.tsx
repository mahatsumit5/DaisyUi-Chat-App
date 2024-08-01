import Alert from "../components/Alert/Alert";
import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import { useGetPostsQuery } from "../redux";

const Home = () => {
  const { isError, isFetching, data: posts } = useGetPostsQuery(null);
  return (
    <div className=" h-full flex  ">
      <div className={`p-2 w-full lg:w-[80%] flex flex-col gap-3 `}>
        <CreatePost />
        {isError ? (
          <Alert message="Error occured while fetching posts" />
        ) : (
          <div className="flex flex-col gap-4">
            {!isFetching ? (
              <>
                {posts?.map((item) => (
                  <PostCard post={item} key={item.id} />
                ))}
              </>
            ) : (
              <>Loading</>
            )}
          </div>
        )}
      </div>
      {/* Side Bar */}
      <div className="hidden lg:flex lg:w-[20%] p-2 ">
        SideBar to Display your friends
      </div>
    </div>
  );
};

export default Home;
