const PostLoading = () => {
  return (
    <div className="flex w-full flex-col gap-4 bg-base-100 p-4 rounded-md">
      <div className="flex justify-between items-center gap-4">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
        <div className="skeleton h-3 w-20"></div>
      </div>
      <div className="skeleton h-32 w-full"></div>

      <div className="flex gap-2 justify-start items-center">
        <div className="skeleton h-6 w-6"></div>
        <div className="skeleton h-6 w-6"></div>
        <div className="skeleton h-6 w-6"></div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="skeleton h-8 w-8"></div>

        <div className="skeleton h-4 w-20"></div>
      </div>
    </div>
  );
};

export default PostLoading;
