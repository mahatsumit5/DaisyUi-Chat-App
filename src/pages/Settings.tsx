import { useState } from "react";
import Menu from "../components/settings/Menu";
import { ProfileSettings, Theme } from "../components";

export type displayComponentKeys = "Theme" | "Profile";
const Settings = () => {
  const [displayComponent, setDisplayComponent] =
    useState<displayComponentKeys>("Theme");

  const display: Record<displayComponentKeys, React.JSX.Element> = {
    Theme: <Theme />,
    Profile: <ProfileSettings />,
  };
  return (
    <div className="flex flex-col gap-2 h-full">
      <Menu
        setDisplayComponent={setDisplayComponent}
        displayComponent={displayComponent}
      />
      <div className="flex h-[98%]">{display[displayComponent]}</div>
    </div>
  );
};

export default Settings;
