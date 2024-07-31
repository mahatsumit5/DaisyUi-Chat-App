import { FcLike } from "react-icons/fc";
import { IPost } from "../../types";
import { FaRegComment } from "react-icons/fa";
import { IoMdMore, IoMdShareAlt } from "react-icons/io";
import { useAppDispatch } from "../../hook";
import { toggleCommentDrawer } from "../../redux/reducer/comment.drawer";
import { dateConverter } from "../../utils";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useEffect, useRef } from "react";
import ImageCarousel from "./ImageCarousel";

const PostCard = ({ post }: { post: IPost }) => {
  const dispatch = useAppDispatch();
  const ContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      console.log(e);
      // if (ContainerRef.current) dispatch(toggleCommentDrawer());
    };
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [dispatch]);
  return (
    <>
      <div
        className="bg-base-200 p-3 rounded-lg flex flex-col gap-3"
        ref={ContainerRef}
      >
        {/* header */}
        <div className="flex gap-2 items-center justify-between">
          <div className="avatar">
            <div className=" w-12 h-12 rounded-full ">
              <img
                src={
                  post.author.profile ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="profile"
              />
            </div>
          </div>
          <p className="font-semibold text-sm flex-1">{`${post.author.fName} ${post.author.lName}`}</p>
          <p className="text-base-content/45">
            {dateConverter(post.createdAt)}
          </p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 btn-sm btn-square"
            >
              <IoMdMore />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-2"
            >
              <li className="">
                <button className="btn w-full justify-between btn-sm">
                  Edit
                  <MdOutlineEdit className="text-primary" size={20} />
                </button>
              </li>
              <li className="">
                <button className="btn w-full justify-between btn-sm">
                  Delete
                  <MdDeleteOutline className="text-error" size={20} />
                </button>
              </li>
            </ul>
          </div>{" "}
        </div>
        {/* Content */}
        <div className="border-b-2 min-h-20 flex flex-col gap-2">
          <span className="text-lg font-semibold">{post.title}</span>
          <span className="text-sm  text-base-content/75">{post.content}</span>
          {post.images.length ? <ImageCarousel images={post.images} /> : null}
        </div>

        {/* Reaction Buttons */}
        <div className="flex gap-2">
          <button className="btn btn-xs btn-ghost">
            <FcLike size={20} />
          </button>
          <button className="btn btn-xs btn-ghost">
            <IoMdShareAlt size={20} />
          </button>
          <button className="btn btn-xs btn-ghost">
            <FaRegComment size={20} />
          </button>
        </div>

        {/* comment */}
        <div className="flex gap-2 items-center">
          <div className="avatar">
            <div className=" w-7 rounded-full ">
              <img
                src={
                  post.author.profile ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="profile"
              />
            </div>
          </div>

          <span
            className="  btn flex justify-start btn-ghost"
            onClick={() => {
              dispatch(toggleCommentDrawer());
            }}
          >
            Add a comment....
          </span>
        </div>
      </div>
    </>
  );
};

export default PostCard;
