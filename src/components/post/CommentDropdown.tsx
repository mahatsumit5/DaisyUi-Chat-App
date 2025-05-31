import React from "react"
import { FiMoreVertical } from "react-icons/fi"
import { useDeleteCommentMutation } from "../../redux/api"
import LoadingButton from "../loadingButton/LoadingButton"
import { PostComment } from "../../types/types"

const CommentDropdown = ({
  Comment,
  handleOnEdit,
}: {
  Comment: PostComment
  handleOnEdit: (arg: PostComment) => typeof arg
}) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation()

  async function handleDeleteComment() {
    await deleteComment({
      id: Comment.id,
    }).unwrap()
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
              handleOnEdit(Comment)
            }}
          >
            Edit
          </button>
        </li>
        <li>
          {/* <button
            className="btn btn-sm"
            disabled={isLoading}
            onClick={handleDeleteComment}
          >
            {isLoading ? <LoadingButton /> : "Delete"}
          </button> */}
          <LoadingButton
            type={"button"}
            handleOnClick={() => {
              handleDeleteComment()
            }}
            isLoading={isLoading}
            loadingText="Please wait..."
            className="btn-square btn-primary w-28 text-base flex justify-center"
            displayText="Upload"
            key={"UploadPost"}
            disabled={isLoading}
          />
        </li>
      </ul>
    </div>
  )
}

export default CommentDropdown
