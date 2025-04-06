import { useAppSelector } from "../../hooks/hook"
import { createPortal } from "react-dom"
const Loading = () => {
  const { content, isLoading } = useAppSelector(store => store.loader)
  return createPortal(
    <div
      className={`absolute w-screen h-screen justify-center items-center z-50 bg-slate-900/35 text-primary ${
        isLoading ? "flex flex-col gap-2" : "hidden"
      }`}
    >
      <span className=" p-4 border-x-blue-500 animate-spin border-y-purple-900 rounded-full border-4 "></span>
      {content}
    </div>,
    document.body
  )
}

export default Loading
