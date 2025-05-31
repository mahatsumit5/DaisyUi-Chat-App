import { Link } from "react-router-dom"
import { IChatRoom, IUser } from "../../types"
import { AiFillDelete, AiFillMessage } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../hooks/hook"
import React, { useState } from "react"
import { IoIosPersonAdd } from "react-icons/io"
import {
  useAcceptFriendRequestMutation,
  useDeleteFriendReqMutation,
  useDeleteSentRequestMutation,
  useSendFriendRequestMutation,
} from "../../redux/api"
import { TiDelete, TiTick } from "react-icons/ti"
import { setCurrentRoom } from "../../redux/reducer/room.slice"
import { setQueryType } from "../../redux/reducer/search.slice"
import { Avatar } from "../Avatar/Avatar"
import { extractInitial } from "../../utils"
import { User } from "../../types/types"
import LoadingButton from "../loadingButton/LoadingButton"

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

      <details className="dropdown relative w-full">
        <summary className="btn m-1 btn-xs ">...</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm z-50">
          <li>
            <a> Profile</a>
          </li>
          <li>
            <a>Delete</a>
          </li>
        </ul>
      </details>
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
  const [sendFriendRequest, { isLoading }] = useSendFriendRequestMutation()
  function handleAddFriend(id: string) {
    sendFriendRequest({ toId: id }).unwrap()
  }

  return (
    <div className="flex justify-end md:justify-center w-full">
      <LoadingButton
        className="btn btn-sm btn-primary items-center"
        handleOnClick={() => {
          handleAddFriend(user.id)
        }}
        isLoading={isLoading}
        loadingText="Adding..."
        displayJSX={
          <IoIosPersonAdd size={15} className="text-primary-content" />
        }
        displayText="Add"
        key={"People"}
      />
    </div>
  )
}

const FriendReq = ({ user }: { user: IUser }) => {
  const [acceptFriendReq, { isLoading }] = useAcceptFriendRequestMutation()
  const [deleteSentRequest, { isLoading: loading }] =
    useDeleteSentRequestMutation()
  const loggedInUser = useAppSelector(store => store.user)
  async function acceptReqHandler(from: string) {
    await acceptFriendReq({
      fromId: from,
      toId: loggedInUser.user?.id as string,
    }).unwrap()
  }
  return (
    <div className="flex  justify-end md:justify-center w-full gap-2">
      <LoadingButton
        className=" btn-circle btn-success"
        handleOnClick={() => {
          acceptReqHandler(user.id)
        }}
        isLoading={isLoading}
        loadingText=""
        displayJSX={<TiTick size={25} />}
        displayText=""
        key={"People"}
      />

      <LoadingButton
        className=" btn-circle btn-error "
        handleOnClick={() => {
          deleteSentRequest({
            fromId: user.id,
            toId: loggedInUser.user?.id as string,
            receiverId: user.id,
            type: "received",
          })
        }}
        isLoading={loading}
        loadingText=""
        displayJSX={<TiDelete size={25} className="text-white" />}
        displayText=""
        key={"People"}
      />
    </div>
  )
}
const SentRequest = ({ user }: { user: User }) => {
  const [deleteSentRequest, { isLoading }] = useDeleteFriendReqMutation()
  const loggedInUser = useAppSelector(store => store.user)

  async function handleCancelReq(to: string) {
    await deleteSentRequest({
      fromId: loggedInUser.user?.id || "",
      toId: to,
    }).unwrap()
  }
  return (
    <div className="flex w-full justify-end md:justify-center">
      <LoadingButton
        className=" text-error-content btn-error items-center"
        handleOnClick={() => {
          handleCancelReq(user.id)
        }}
        isLoading={isLoading}
        loadingText="Please wait..."
        displayJSX={<AiFillDelete size={15} className="text-error-content" />}
        displayText="Delete"
        key={"People"}
      />
    </div>
  )
}

export default FriendCard
