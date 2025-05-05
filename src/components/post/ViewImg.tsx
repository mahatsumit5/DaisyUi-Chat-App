import React from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hook"
import ImageCarousel from "./ImageCarousel"
import { IPost } from "../../types"
import { IoIosClose } from "react-icons/io"
import { closeImgBox } from "../../redux/reducer/ViewImg.slice"
import { AnimatePresence, motion } from "framer-motion"
import { SlLike } from "react-icons/sl"
import { FaRegComment } from "react-icons/fa6"
import { CiShare2 } from "react-icons/ci"
import CommentDialog from "./CommentDialog"
import { toggleCommentDrawer } from "../../redux/reducer/comment.drawer"

const variants = {
  open: { opacity: 1, display: "flex" },
  closed: { opacity: 0, display: "hidden" },
}
const ViewImg = () => {
  const { isOpen, post } = useAppSelector(store => store.viewImgBox)
  const dispatch = useAppDispatch()
  function handleClose() {
    dispatch(closeImgBox())
  }
  return isOpen && post != null ? (
    <AnimatePresence>
      <motion.div
        className="fixed top-0  z-50 h-screen w-screen bg-black/70   items-center justify-center"
        animate={isOpen ? "open" : "closed"}
        transition={{ ease: "easeOut", duration: 0.5 }}
        variants={variants}
      >
        {/* outer layout */}
        <motion.div
          className="p-4 bg-base-300 rounded-md shadow-lg m-2 py-8 md:py-4 flex flex-col-reverse md:flex-row-reverse gap-2 relative overflow-y-auto max-h-[90%]"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ x: -200, opacity: 0 }}
        >
          {/* close button */}

          <button
            className="absolute btn btn-xs btn-circle btn-info right-2 top-1 btn-ghost"
            onClick={handleClose}
          >
            <IoIosClose size={18} />
          </button>
          {/* Content and comment sections */}
          <div className="md:max-w-80 flex flex-col gap-3 max-h-[40%]">
            <p className="font-sans font-bold text-sm">{post.title}</p>
            <p className="font-sans text-xs ">{post.content}</p>

            {/* Interaction section */}
            <div className="flex justify-between">
              <button className="btn btn-primary btn-ghost btn-sm ">
                <SlLike />
                <span className="font-xs font-sans">Like</span>
              </button>
              <button
                className="btn btn-primary btn-ghost btn-sm "
                onClick={() => {
                  dispatch(toggleCommentDrawer(post.id))
                }}
              >
                <FaRegComment />
                <span className="font-xs font-sans">Comment</span>
              </button>
              <button className="btn btn-primary btn-ghost btn-sm ">
                <CiShare2 />
                <span className="font-xs font-sans">Share</span>
              </button>
            </div>

            {/* comment section */}

            <CommentDialog
              postId={post.id}
              key={post.id}
              author={post.author}
            />
          </div>
          {/* image section */}
          <div className="max-h-[60%]">
            <ImageCarousel post={post as IPost} images={post?.images || []} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  ) : null
}

export default ViewImg
