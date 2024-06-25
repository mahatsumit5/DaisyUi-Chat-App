import { useState } from "react";
import ThemeChanger from "../components/settings/ThemeChanger";
import Menu from "../components/settings/Menu";
import ChangePassword from "../components/user/ChangePassword";

export type displayComponentKeys = "Theme" | "Password";
const Settings = () => {
  const [displayComponent, setDisplayComponent] =
    useState<displayComponentKeys>("Theme");

  const display: Record<displayComponentKeys, React.JSX.Element> = {
    Password: <ChangePassword />,
    Theme: <ThemeChanger />,
  };
  return (
    <div className="flex flex-col gap-2 h-full">
      <Menu setDisplayComponent={setDisplayComponent} />{" "}
      <div className="flex h-[98%]">{display[displayComponent]}</div>
    </div>
  );
};

export default Settings;
