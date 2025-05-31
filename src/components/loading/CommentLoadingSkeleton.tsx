import React from "react"

const CommentLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      {/* Comment header: avatar, name, time */}
      <div className="flex gap-2 items-center justify-between">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 skeleton rounded-full"></div>

        {/* Name and time placeholders */}
        <span className="flex-1">
          {/* Name placeholder */}
          <div className="h-3 skeleton rounded w-24 mb-1" />
          {/* Time placeholder */}
          <div className="h-2 skeleton rounded w-14" />
        </span>

        {/* Like, update, delete buttons placeholder */}
        <div className="flex gap-2 justify-end">
          {/* Like button placeholder */}
          <div className="w-6 h-6 skeleton rounded-full"></div>
          {/* Dropdown button placeholder (assuming it's a small circle/square) */}
          <div className="w-6 h-6 skeleton rounded-full"></div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="ml-12 flex justify-between">
        <div className="h-6 skeleton rounded w-14"></div>
      </div>
      <div className="ml-12 flex justify-between">
        <div className="h-2 skeleton rounded w-14"></div>
      </div>
    </div>
  )
}

export default CommentLoadingSkeleton
