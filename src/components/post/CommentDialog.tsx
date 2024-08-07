import { FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { motion } from "framer-motion";
import { toggleCommentDrawer } from "../../redux/reducer/comment.drawer";
import { IoCloseCircleSharp } from "react-icons/io5";
import {
  useGetCommentsQuery,
  useLikeCommentMutation,
  usePostCommentMutation,
  useUnlikeCommentMutation,
} from "../../redux";
import { IUser } from "../../types";
import { dateConverter, extractInitial } from "../../utils";
import { LuHeart } from "react-icons/lu";
import { Avatar } from "../Avatar/Avatar";
import CommentDropdown from "./CommentDropdown";
import { RiHeartFill } from "react-icons/ri";

const CommentDialog = ({
  postId,
  author,
}: {
  author: IUser;
  postId: string;
}) => {
  const { data: comments } = useGetCommentsQuery(postId);
  const [postComment] = usePostCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();
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
    inputRef.current?.value;
  };

  const handleLikeComment = async (
    commentId: string,
    type: "like" | "unlike"
  ) => {
    switch (type) {
      case "like":
        await likeComment({ commentId, postId });
        break;
      case "unlike":
        console.log("unlike");
        // unlike here
        await unlikeComment({ commentId, postId });
        break;
      default:
        break;
    }
  };
  return user?.id ? (
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
          className="btn btn-xs btn-primary btn-square"
        >
          <IoCloseCircleSharp size={16} />
        </button>
      </div>
      {/* content */}

      {comments?.length ? (
        <div className="py-4  flex-1 flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2 ">
              {/* Comment header profile name time */}
              <div className="flex gap-2 items-center justify-between">
                {/* avatar */}
                <Avatar
                  initial={extractInitial(
                    comment.author.fName,
                    comment.author.lName
                  )}
                  url={comment.author.profile as string}
                  classname="w-10"
                />

                <span>
                  {/* name */}
                  <p className="text-sm font-bold">
                    {comment.author.fName} {comment.author.lName}
                  </p>
                  {/* time */}
                  <p className="flex-1 text-xs">
                    {dateConverter(comment.updatedAt)}
                  </p>
                </span>

                {/*like update delete */}
                <div className="flex gap-2 flex-1 justify-end">
                  {comment.likes.find(({ userId }) => userId === user.id) ? (
                    <button
                      className="btn btn-xs btn-circle"
                      onClick={() => {
                        handleLikeComment(comment.id, "unlike");
                      }}
                    >
                      <RiHeartFill className="text-error" />
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-circle"
                      onClick={() => {
                        handleLikeComment(comment.id, "like");
                      }}
                    >
                      <LuHeart />
                    </button>
                  )}
                  {comment.authorId === user?.id && (
                    <CommentDropdown Comment={comment} />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="ml-12 flex justify-between ">
                <p className="text-sm">{comment.content}</p>
                <p className="text-xs">{comment.likes.length} likes</p>
              </div>
              {/* Reply button */}
              <div className="ml-8 flex justify-start">
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
        <Avatar
          initial={extractInitial(author.fName, author.lName)}
          url={user?.profile as string}
          classname="w-10"
        />
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
  ) : null;
};

export default CommentDialog;
