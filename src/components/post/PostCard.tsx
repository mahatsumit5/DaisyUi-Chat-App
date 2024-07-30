import { FcLike } from "react-icons/fc";
import { IPost } from "../../types";
import { FaRegComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { useAppDispatch } from "../../hook";
import { toggleCommentDrawer } from "../../redux/reducer/comment.drawer";

const PostCard = ({ post }: { post: IPost }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="bg-base-200 p-3 rounded-lg flex flex-col gap-3">
        <div className="flex gap-2 items-start justify-between">
          <div className="avatar">
            <div className=" w-12 h-12 rounded-full ">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          <p className="font-semibold text-sm flex-1">{`${post.author.fName} ${post.author.lName}`}</p>
          <p>created at</p>
        </div>
        <div className="border-b-2 min-h-20 flex flex-col gap-2">
          <span className="text-lg font-semibold">{post.title}</span>
          <span className="text-lg font-semibold">{post.content}</span>
        </div>
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

        <div className="flex gap-2 items-center">
          <div className="avatar">
            <div className=" w-7 rounded-full ">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
