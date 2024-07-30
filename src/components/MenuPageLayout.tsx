import { useState } from "react";
import Menu from "./settings/Menu";
function MenuPageLayout<T>({
  display,
  links,
}: {
  display: Record<string, JSX.Element>;
  links: { id: number; text: T; icon: JSX.Element }[];
}) {
  const [displayComponent, setDisplayComponent] = useState<T>(links[0].text);

  return (
    <div className="flex flex-col  h-full">
      <Menu
        setDisplayComponent={setDisplayComponent}
        displayComponent={displayComponent}
        links={links}
      />
      <div className="flex  bg-base-100 border-base-300 overflow-y-auto  w-full p-2 rounded-lg flex-1">
        {display[displayComponent as string]}
      </div>
    </div>
  );
}

export default MenuPageLayout;