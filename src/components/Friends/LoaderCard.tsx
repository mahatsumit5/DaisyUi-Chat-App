const LoaderCard = () => {
  return (
    <div className="flex  flex-row md:flex-col gap-4 w-full md:w-52 bg-base-200  rounded-xl   md:h-56  items-center justify-between p-2 ">
      <div className="skeleton w-16 h-16 md:w-24 md:h-24 bg-slate-300 rounded-full shrink-0"></div>
      <div className="skeleton h-8 md:h-2 w-28 bg-slate-300"></div>
      <div className="skeleton h-2 w-full bg-slate-300 hidden"></div>
      <div className="skeleton h-8 w-16 bg-slate-300"></div>
    </div>
  );
};

export default LoaderCard;
