const LoaderCard = () => {
  return (
    <div className="flex flex-col gap-4 w-52 bg-gray-100 rounded-xl h-56 items-center justify-between p-4 ">
      <div className="skeleton w-24 h-24 bg-slate-300 rounded-full shrink-0"></div>{" "}
      <div className="skeleton h-2 w-28 bg-slate-300"></div>
      <div className="skeleton h-2 w-full bg-slate-300"></div>
      <div className="skeleton h-8 w-28 bg-slate-300"></div>
    </div>
  );
};

export default LoaderCard;
