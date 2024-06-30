import { Dispatch, SetStateAction } from "react";
import { displayComponentKeys } from "../../pages/Settings";
import { FaAffiliatetheme } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const links = [
  {
    id: 1,
    text: "Theme",
    icon: <FaAffiliatetheme />,
  },

  {
    id: 2,
    text: "Profile",
    icon: <CgProfile />,
  },
];
const Menu = ({
  setDisplayComponent,
  displayComponent,
}: {
  displayComponent: displayComponentKeys;
  setDisplayComponent: Dispatch<SetStateAction<displayComponentKeys>>;
}) => {
  return (
    <ul className="menu gap-2 menu-horizontal rounded-b-md">
      {links.map((item) => (
        <li
          key={item.id}
          className={`${
            displayComponent === item.text
              ? "bg-primary/80 rounded-lg text-primary-content"
              : ""
          } font-semibold`}
        >
          <a
            onClick={() => {
              setDisplayComponent(item.text as displayComponentKeys);
            }}
          >
            {item.icon}
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
