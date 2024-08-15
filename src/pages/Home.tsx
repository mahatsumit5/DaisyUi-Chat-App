import Alert from "../components/Alert/Alert";
import HomeAllUsers from "../components/Friends/HomeAllUsers";
import CreatePost from "../components/post/CreatePost";
import PostCard from "../components/post/PostCard";
import PostLoading from "../components/post/PostLoading";
import {
  useGetAllChatRoomQuery,
  useGetAllUsersQuery,
  useGetPostsQuery,
} from "../redux";
import { useAppDispatch, useAppSelector } from "../hook";
import { setSkip } from "../redux/reducer/post.slice";
import { LoadingButton } from "../components";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [position, setPostion] = useState((window.innerWidth - 1280) / 2);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const { skip } = useAppSelector((state) => state.post);
  const { isError, isLoading: loading, data: posts } = useGetPostsQuery(skip);
  const {
    isLoading,
    isError: usersError,
    data: users,
  } = useGetAllUsersQuery({ order: "asc", page: 1, take: 10, search: "" });

  const {
    isError: friendError,
    isLoading: friendLoading,
    data: friends,
  } = useGetAllChatRoomQuery({ page: 1, search: "", take: 10 });
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

  useEffect(() => {
    const handlOnResize = () => {
      const newPosition = (window.innerWidth - 1280) / 2;
      console.log(newPosition);
      if (newPosition > 0) {
        setPostion(newPosition);
      } else {
        setPostion(5);
      }
    };
    window.addEventListener("resize", handlOnResize);
    return () => {
      window.removeEventListener("resize", handlOnResize);
    };
  }, []);
  return (
    <div className=" h-full flex  lg:mr-[310px] ">
      <div className={` px-2 w-full lg:w-full flex flex-col gap-3   `}>
        <CreatePost />

        {isError ? (
          <Alert message="Error occured while fetching posts" />
        ) : (
          <div className="flex flex-col gap-4  ">
            {loading
              ? Array(5)
                  .fill("")
                  .map((item, index) => <PostLoading key={index} />)
              : posts?.posts?.map((item) => (
                  <PostCard post={item} key={item.id} />
                ))}
            <div className="w-full items-center flex justify-center">
              <button
                ref={btnRef}
                className="btn btn-sm btn-primary btn-ghost w-40 "
                onClick={() => {
                  dispatch(setSkip(skip + 4));
                  btnRef.current?.scrollIntoView();
                }}
                disabled={(posts?.totalNumberOfPosts as number) - skip < 4}
              >
                {loading ? <LoadingButton /> : "Show More"}
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Side Bar */}
      <div
        className="hidden lg:flex  lg:w-[300px]  py-4    bg-base-100 rounded-lg   h-fit fixed w-[100dvw]    "
        style={{ right: position }}
      >
        <div className="flex flex-col gap-4 w-full px-2">
          <span className="mx-2 text-sm font-bold">Friends</span>

          {friendError ? (
            <>Error Ocurred</>
          ) : friendLoading ? (
            <>Loading....</>
          ) : (
            <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
              {friends?.data.length ? (
                friends?.data.map((item) => (
                  <HomeAllUsers
                    key={item.id}
                    user={{
                      email: item.email,
                      fName: item.fName,
                      id: item.userId,
                      lName: item.lName,
                      profile: item.profile,
                      isActive: item.isActive,
                    }}
                    type="friends"
                    room={item}
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
            <div className=" max-h-60 overflow-y-auto flex flex-col gap-2">
              {users?.data.map((user) => (
                <HomeAllUsers key={user.id} user={user} type="users" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
