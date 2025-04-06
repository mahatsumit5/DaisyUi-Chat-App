import { FaAffiliatetheme } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import MenuPageLayout from "../components/MenuPageLayout"
import { ProfileSettings, Theme } from "../components"
import React from "react"
export type displayComponentKeys = "Theme" | "Profile"

const links = [
  {
    id: 1,
    text: "Theme" as displayComponentKeys,
    icon: <FaAffiliatetheme />,
  },

  {
    id: 2,
    text: "Profile" as displayComponentKeys,
    icon: <CgProfile />,
  },
]

const Settings = () => {
  const display: Record<displayComponentKeys, React.JSX.Element> = {
    Theme: <Theme />,
    Profile: <ProfileSettings />,
  }
  return (
    <MenuPageLayout<displayComponentKeys>
      links={links}
      display={display}
      key={"settings"}
    />
  )
}

export default Settings
