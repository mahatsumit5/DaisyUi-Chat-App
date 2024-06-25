import { Dispatch, SetStateAction } from "react";
import { displayComponentKeys } from "../../pages/Settings";
import { FaAffiliatetheme } from "react-icons/fa";
const links = [
  {
    id: 1,
    text: "Theme",
    icon: <FaAffiliatetheme />,
  },
  {
    id: 2,
    text: "Password",
    icon: <FaAffiliatetheme />,
  },
];
const Menu = ({
  setDisplayComponent,
}: {
  setDisplayComponent: Dispatch<SetStateAction<displayComponentKeys>>;
}) => {
  return (
    <ul className="menu bg-base-200 menu-horizontal rounded-box">
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
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Profile
          <span className="badge badge-sm badge-warning">NEW</span>
        </a>
      </li>
      <li>
        <a>
          Stats
          <span className="badge badge-xs badge-info"></span>
        </a>
      </li>
    </ul>
  );
};

export default Menu;
