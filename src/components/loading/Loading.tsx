import { useAppSelector } from "../../hook";

const Loading = () => {
  const { content, isLoading } = useAppSelector((store) => store.loader);
  return (
    <div
      className={`absolute w-screen h-screen justify-center items-center z-50 bg-slate-900/35 text-white ${
        isLoading ? "flex flex-col gap-2" : "hidden"
      }`}
    >
      <span className=" p-4 border-x-blue-500 animate-spin border-y-purple-900 rounded-full border-4 "></span>
      {content}
    </div>
  );
};

export default Loading;
