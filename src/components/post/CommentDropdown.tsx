import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IComment } from "../../types";
import { useDeleteCommentMutation } from "../../redux";
import LoadingButton from "../loading/LoadingButton";

const CommentDropdown: React.FC<{
  Comment: IComment;
  handleOnEdit: (comment: IComment) => void;
}> = ({ Comment, handleOnEdit }) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();

  async function handleDeleteComment() {
    await deleteComment({
      commentId: Comment.id,
      postId: Comment.postId,
    }).unwrap();
  }
  return (
    <div className="dropdown dropdown-hover dropdown-left">
      <div tabIndex={0} role="button" className="btn  btn-xs btn-circle ">
        <FiMoreVertical />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-2"
      >
        <li>
          <button
            className="btn btn-sm"
            onClick={() => {
              handleOnEdit(Comment);
            }}
          >
            Edit{" "}
          </button>
        </li>
        <li>
          <button
            className="btn btn-sm"
            disabled={isLoading}
            onClick={handleDeleteComment}
          >
            {isLoading ? <LoadingButton /> : "Delete"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CommentDropdown;
