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
}: {
  setDisplayComponent: Dispatch<SetStateAction<displayComponentKeys>>;
}) => {
  return (
    <ul className="menu bg-base-100 menu-horizontal rounded-box">
      {links.map((item) => (
        <li key={item.id}>
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
