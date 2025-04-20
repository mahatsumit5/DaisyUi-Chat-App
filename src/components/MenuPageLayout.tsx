import React, { useState } from "react"
import Menu from "./settings/Menu"
function MenuPageLayout<T>({
  display,
  links,
}: {
  display: Record<string, React.JSX.Element>
  links: { id: number; text: T; icon: React.JSX.Element }[]
}) {
  const [displayComponent, setDisplayComponent] = useState<T>(links[0].text)

  return (
    <div className="flex flex-col  h-full   rounded-md min-h-[90dvh] gap-4 ">
      <Menu
        setDisplayComponent={setDisplayComponent}
        displayComponent={displayComponent}
        links={links}
      />
      <div className="flex   w-full rounded-lg flex-1 px-1 ">
        {display[displayComponent as string]}
      </div>
    </div>
  )
}

export default MenuPageLayout
