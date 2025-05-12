import { FcLike } from "react-icons/fc"
import { IoIosHeartEmpty } from "react-icons/io"
import { useAppDispatch } from "../../hooks/hook"
import { toggleCommentDrawer } from "../../redux/reducer/comment.drawer"
import { FaRegComment } from "react-icons/fa"
import { IPost } from "../../types"
import { CiShare2 } from "react-icons/ci"
import { useLikePostMutation, useUnlikePostMutation } from "../../redux/api"

const Reaction = ({ post }: { post: IPost }) => {
  const dispatch = useAppDispatch()
  const [likePost] = useLikePostMutation()
  const [removeLike] = useUnlikePostMutation()

  async function handleOnLike() {
    await likePost({ postId: post.id }).unwrap()
  }

  async function handleOnRemoveLike() {
    await removeLike({ postId: post.id })
  }
  return (
    <div className="flex gap-2">
      {post.hasLiked ? (
        <button className="btn btn-xs btn-ghost" onClick={handleOnRemoveLike}>
          <FcLike size={20} />
        </button>
      ) : (
        <button className="btn btn-xs btn-ghost" onClick={handleOnLike}>
          <IoIosHeartEmpty size={20} />
        </button>
      )}

      <button
        className="btn btn-xs btn-ghost"
        onClick={() => {
          dispatch(toggleCommentDrawer(post.id))
        }}
      >
        <FaRegComment size={20} />
      </button>
      <button className="btn btn-xs btn-ghost">
        <CiShare2 size={20} />
      </button>
    </div>
  )
}

export default Reaction
