import { Link } from "react-router-dom"
import { IChatRoom, IUser } from "../../types"
import { AiFillDelete, AiFillMessage } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../hooks/hook"
import React, { useState } from "react"
import { IoIosPersonAdd } from "react-icons/io"
import {
  useAcceptFriendReqMutation,
  useDeleteSentRequestMutation,
  useSendFriendRequestMutation,
} from "../../redux"
import { TiDelete, TiTick } from "react-icons/ti"
import { setCurrentRoom } from "../../redux/reducer/room.slice"
import { setQueryType } from "../../redux/reducer/search.slice"
import { Avatar } from "../Avatar/Avatar"
import { extractInitial } from "../../utils"
import { User } from "../../types/types"
import {
  useAcceptFriendRequestMutation,
  useDeleteFriendReqMutation,
} from "../../graphql/queries/request.generated"
type keys = "peoples" | "friends" | "request" | "SentRequest"

const FriendCard = ({ user, type }: { user: IChatRoom | User; type: keys }) => {
  const [display] = useState<keys>(type)

  const displayComponent: Record<keys, React.JSX.Element> = {
    friends: <Friends user={user as IChatRoom} />,
    peoples: <AllPeoples user={user as IChatRoom} />,
    request: <FriendReq user={user as IUser} />,
    SentRequest: <SentRequest user={user} />,
  }
  return (
    <div className="  w-full sm:w-[200px]  p-4 rounded-lg  flex md:flex-col   bg-base-100    items-center justify-start gap-2   shadow-md   ">
      {/* Avatar and name */}

      <Avatar
        initial={extractInitial(user.fName, user.lName)}
        url={user.profile!}
        classname="w-10 md:w-24 text-xl"
      />
      <div className="flex flex-col items-start  md:items-center justify-center ">
        <span className="flex  sm:flex-row gap-1">
          <h1 className="text-base">{user?.fName}</h1>

          <h1 className="text-base ">{user?.lName}</h1>
        </span>

        <p className="text-xs text-gray-500 line-clamp-1  font-normal  ">
          {user.email}
        </p>
      </div>
      {displayComponent[display]}
    </div>
  )
}

const Friends = ({ user }: { user: IChatRoom }) => {
  const dispatch = useAppDispatch()

  function handleClick(room: IChatRoom) {
    dispatch(setCurrentRoom(room))
    dispatch(setQueryType("Messages"))
  }
  return (
    <Link to={"/chat"}>
      <button
        className="btn   btn-primary"
        onClick={() => {
          handleClick(user)
        }}
      >
        <AiFillMessage size={30} className="text-primary-content" />
      </button>
    </Link>
  )
}

const AllPeoples = ({ user }: { user: IChatRoom }) => {
  const [sendFriendRequest] = useSendFriendRequestMutation()
  function handleAddFriend(id: string) {
    sendFriendRequest({ toId: id }).unwrap()
  }

  return (
    <div className="flex justify-end md:justify-center w-full">
      <button
        className="  btn btn-sm  btn-primary"
        onClick={() => {
          handleAddFriend(user.id)
        }}
      >
        Add <IoIosPersonAdd size={15} className="text-primary-content" />
      </button>
    </div>
  )
}

const FriendReq = ({ user }: { user: IUser }) => {
  const [acceptFriendReq] = useAcceptFriendRequestMutation()
  const [deleteSentRequest] = useDeleteSentRequestMutation()
  const loggedInUser = useAppSelector(store => store.user)
  async function acceptReqHandler(from: string) {
    await acceptFriendReq({
      fromId: from,
      toId: loggedInUser.user?.id as string,
    }).unwrap()
  }
  return (
    <div className="flex  justify-end md:justify-center w-full gap-2">
      <button
        className="btn btn-sm btn-circle btn-success"
        onClick={() => {
          acceptReqHandler(user.id)
        }}
      >
        <TiTick size={30} />
      </button>
      <button
        className="btn btn-sm btn-circle btn-error  items-center "
        onClick={() => {
          deleteSentRequest({
            fromId: user.id,
            toId: loggedInUser.user?.id as string,
            receiverId: user.id,
            type: "received",
          })
        }}
      >
        <TiDelete size={30} className="text-white" />
      </button>
    </div>
  )
}
const SentRequest = ({ user }: { user: User }) => {
  const [deleteSentRequest] = useDeleteFriendReqMutation()
  const loggedInUser = useAppSelector(store => store.user)

  async function handleCancelReq(to: string) {
    await deleteSentRequest({
      fromId: loggedInUser.user?.id || "",
      toId: to,
    }).unwrap()
  }
  return (
    <div className="flex w-full justify-end md:justify-center">
      <button
        className="btn text-error-content btn-error btn-sm"
        onClick={() => {
          handleCancelReq(user.id)
        }}
      >
        Cancel <AiFillDelete size={15} className="text-error-content" />
      </button>
    </div>
  )
}

export default FriendCard
