import { FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { motion } from "framer-motion";
import { toggleCommentDrawer } from "../../redux/reducer/comment.drawer";
import { IoCloseCircleSharp } from "react-icons/io5";
import { usePostCommentMutation } from "../../redux";
import { IComment, IUser } from "../../types";
import { dateConverter } from "../../utils";
import { FiMoreVertical } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";

const CommentDialog = ({
  comments,
  postId,
  author,
}: {
  author: IUser;
  comments: IComment[];
  postId: string;
}) => {
  const [postComment] = usePostCommentMutation();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };
  const { isOpen, postId: id } = useAppSelector((store) => store.comment);
  const { user } = useAppSelector((store) => store.user);
  const handleOnComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postComment({
      content: inputRef.current?.value as string,
      postId,
      userId: user?.id as string,
    });
  };
  return (
    <motion.div
      className=" w-full   rounded-lg     overflow-hidden flex flex-col gap-3"
      animate={isOpen && postId === id ? "open" : "closed"}
      transition={{ ease: "easeOut", duration: 0.5 }}
      variants={variants}
    >
      {/* header */}
      <div className="w-full flex justify-between items-center border-b-2">
        <p className="text-sm font-semibold">Comments</p>
        <button
          onClick={() => {
            dispatch(toggleCommentDrawer(postId));
          }}
          className="btn btn-sm btn-ghost btn-square"
        >
          <IoCloseCircleSharp size={20} />
        </button>
      </div>
      {/* content */}

      {comments.length ? (
        <div className="py-4  flex-1 flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2 ">
              {/* Comment header profile name time */}
              <div className="flex gap-2 items-center">
                {/* avatar */}
                <div className="avatar">
                  <div className=" w-7 rounded-full ">
                    <img
                      src={
                        author.profile ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="profile"
                    />
                  </div>
                </div>

                {/* name */}
                <p className="text-sm font-bold">
                  {author.fName} {author.lName}
                </p>
                {/* time */}
                <p className="flex-1">{dateConverter(comment.updatedAt)}</p>

                {/* more actions */}
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-circle">
                    <LuHeart />
                  </button>
                  {author.id === user?.id && (
                    <button className="btn btn-sm btn-circle btn-link">
                      <FiMoreVertical />
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <p className="ml-9 text-sm">{comment.content}</p>
              {/* Reply button */}
              <div className="ml-6">
                <button className="btn btn-sm btn-link">Reply</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center flex-col gap-3 h-40">
          <p className="text-lg font-semibold">No comments yet</p>
          <p>Start a conversation</p>
        </div>
      )}
      {/* Input Field */}
      <form className="flex gap-2 items-center" onSubmit={handleOnComment}>
        <div className="avatar">
          <div className=" w-12 h-12 rounded-full ">
            <img
              src={
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="profile"
            />
          </div>
        </div>
        <input
          type="text"
          className="input input-sm text-[16px] flex-1 rounded-xl focus:outline-primary bg-base-200 border-none"
          placeholder="Add a comment"
          name="comments"
          ref={inputRef}
        />
        <button></button>
      </form>
    </motion.div>
  );
};

export default CommentDialog;
