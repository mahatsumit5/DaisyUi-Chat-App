import { useState } from "react";
import ThemeChanger from "../components/settings/ThemeChanger";
import Menu from "../components/settings/Menu";
import ProfileSettings from "../components/settings/ProfileSettings";

export type displayComponentKeys = "Theme" | "Profile";
const Settings = () => {
  const [displayComponent, setDisplayComponent] =
    useState<displayComponentKeys>("Theme");

  const display: Record<displayComponentKeys, React.JSX.Element> = {
    Theme: <ThemeChanger />,
    Profile: <ProfileSettings />,
  };
  return (
    <div className="flex flex-col gap-2 h-full">
      <Menu setDisplayComponent={setDisplayComponent} />{" "}
      <div className="flex h-[98%]">{display[displayComponent]}</div>
    </div>
  );
};

export default Settings;
