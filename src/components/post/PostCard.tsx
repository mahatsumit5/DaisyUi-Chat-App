import { FcLike } from "react-icons/fc";
import { IPost } from "../../types";
import { FaRegComment } from "react-icons/fa";
import { IoMdMore, IoMdShareAlt } from "react-icons/io";
import { useAppDispatch } from "../../hook";
import { toggleCommentDrawer } from "../../redux/reducer/comment.drawer";
import { dateConverter } from "../../utils";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { useDeletePostMutation, useUpdatePostMutation } from "../../redux";
import CommentDialog from "./CommentDialog";

const PostCard = ({ post }: { post: IPost }) => {
  const [updatePost] = useUpdatePostMutation();
  const [form, setForm] = useState({
    title: post.title,
    content: post.content,
  });
  const InputRef = useRef<HTMLInputElement>(null);
  const TextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();
  const [deletePost] = useDeletePostMutation();
  const ContainerRef = useRef<HTMLDivElement>(null);
  const handleDeletePost = async () => {
    await deletePost(post.id).unwrap();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdatePost = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditing(false);

      try {
        await updatePost({ ...form, id: post.id }).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (post.title === form.title && post.content === form.content) return;
    const handleOutSideClick = (e: MouseEvent) => {
      if (
        ContainerRef.current &&
        !ContainerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        console.log(form);
      }
    };
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [form, post]);

  useEffect(() => {
    if (editing && InputRef.current) {
      InputRef.current.focus();
    }
  }, [editing]);
  return (
    <>
      <div className="bg-base-300/75 p-3 rounded-lg flex flex-col gap-3 overflow-y-auto">
        {/* header */}
        <div className="flex gap-2 items-center justify-between ">
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
                <button
                  className="btn w-full justify-between btn-sm"
                  type="button"
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  Edit
                  <MdOutlineEdit className="text-primary" size={20} />
                </button>
              </li>
              <li className="">
                <button
                  className="btn w-full justify-between btn-sm"
                  type="button"
                  onClick={handleDeletePost}
                >
                  Delete
                  <MdDeleteOutline className="text-error" size={20} />
                </button>
              </li>
            </ul>
          </div>{" "}
        </div>
        {/* Content */}
        <div className="border-b-2 min-h-20 flex flex-col gap-2">
          <div className="flex flex-col gap-2" ref={ContainerRef}>
            <input
              className="text-lg font-semibold  disabled:cursor-text w-full input input-sm disabled:text-base-content disabled:bg-base-200/75"
              disabled={!editing}
              value={form.title}
              ref={InputRef}
              onKeyDown={handleUpdatePost}
              name="title"
              onChange={handleInputChange}
            />
            <textarea
              className="text-sm   w-full  resize-none input input-lg disabled:text-base-content "
              disabled={!editing}
              value={form.content}
              name="content"
              onKeyDown={handleUpdatePost}
              onChange={handleInputChange}
              ref={TextAreaRef}
            />
          </div>

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
        {/*add comment */}
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
            className="  btn flex justify-start btn-ghost btn-sm "
            onClick={() => {
              dispatch(toggleCommentDrawer(post.id));
            }}
          >
            Add a comment....
          </span>
        </div>
        {/* Comment section */}

        <CommentDialog
          comments={post.comments}
          postId={post.id}
          key={post.id}
          author={post.author}
        />
      </div>
    </>
  );
};

export default PostCard;
