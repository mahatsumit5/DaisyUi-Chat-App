import Alert from "../components/Alert/Alert";
import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import { useAppSelector } from "../hook";
import { useGetPostsQuery } from "../redux";

const Home = () => {
  const { isOpen } = useAppSelector((store) => store.comment);

  const { isError, isFetching, data: posts } = useGetPostsQuery();
  return (
    <div className=" h-full flex gap-2 ">
      <div
        className={`p-2 w-full lg:w-[80%] bg-base-100 flex flex-col gap-3 ${
          isOpen ? "overflow-hidden" : ""
        }`}
      >
        <CreatePost />
        {isError ? (
          <Alert message="Error occured while fetching posts" />
        ) : (
          <div className="flex flex-col gap-2">
            {!isFetching ? (
              <>
                {posts?.map((item) => (
                  <>
                    <PostCard post={item} key={item.id} />
                  </>
                ))}
              </>
            ) : (
              <>Loading</>
            )}
          </div>
        )}
      </div>
      <div className="hidden lg:flex lg:w-[30%] bg-base-100 p-2">
        SideBar to Display your friends
      </div>
    </div>
  );
};

export default Home;
