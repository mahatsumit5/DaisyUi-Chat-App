import { AllPeoples, FriendRequest, SentRequest } from "../components"
import { MenuLayout } from "../components/index"
import { FaAffiliatetheme } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import React from "react"
export type displayComponentKeys = "Friend Request" | "Sent Request" | "Peoples"

const links = [
  {
    id: 1,
    text: "Friend Request" as displayComponentKeys,
    icon: <FaAffiliatetheme />,
  },

  {
    id: 2,
    text: "Sent Request" as displayComponentKeys,
    icon: <CgProfile />,
  },
  {
    id: 3,
    text: "Peoples" as displayComponentKeys,
    icon: <CgProfile />,
  },
]
const RequestPage = () => {
  const display: Record<displayComponentKeys, React.JSX.Element> = {
    "Friend Request": <FriendRequest />,
    "Sent Request": <SentRequest />,
    Peoples: <AllPeoples />,
  }
  return (
    <MenuLayout<displayComponentKeys>
      links={links}
      display={display}
      key={"request"}
    />
  )
}

export default RequestPage
