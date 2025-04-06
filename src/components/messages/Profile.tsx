import { Dispatch, SetStateAction } from "react"
import { AiFillMessage } from "react-icons/ai"
import { LiaUserFriendsSolid } from "react-icons/lia"
import { useAppSelector } from "../../hooks/hook"
import { IUser } from "../../types"

export default function Profile({
  setComponent,
  type,
}: {
  setComponent?: Dispatch<SetStateAction<"message" | "profile">>
  type: "friend" | "allUsers"
}) {
  const { currentRoom } = useAppSelector(store => store.rooms)
  const { currentUser } = useAppSelector(store => store.rooms)
  const user = type === "friend" ? currentRoom : (currentUser as IUser)
  return (
    <div className="flex-1 bg-white rounded-md  flex flex-col items-center justify-start gap-5">
      {/* background and image */}
      <div className="h-1/3 w-full flex items-start justify-between rounded-lg px-5 py-5">
        <button className="btn btn-outline">
          <LiaUserFriendsSolid size={30} color="pink" />
          Connect
        </button>
        <div className="w-40 rounded-full mt-10">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            className="rounded-full"
          />
        </div>
        <button
          className="btn btn-outline"
          onClick={() => {
            if (setComponent) setComponent("message")
          }}
        >
          <AiFillMessage size={30} color="pink" />
          Message
        </button>
      </div>
      {/* information */}
      <h1 className="text-4xl font-bold text-black font-serif">
        {user?.fName}&nbsp;
        {user?.lName}
      </h1>
      <h1 className="text-xl font-bold text-gray-400 font-serif">
        {user?.email}
      </h1>
      <p className="max-w-80 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
      </p>
      <div className="flex flex-col gap-1 items-center justify-center">
        <p className=" text-3xl text-red-600 font-bold">65</p>
        <span className=" text-gray-500 text-xl">Friends</span>
      </div>
      <button className="btn btn-lg btn-outline">
        <AiFillMessage size={30} color="pink" />
        Explore
      </button>
    </div>
  )
}
