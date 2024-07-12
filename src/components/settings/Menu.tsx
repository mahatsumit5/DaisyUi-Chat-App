import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../hook";
import { setQueryType } from "../../redux/reducer/search.slice";
import { setPage } from "../../redux/reducer/pagination.slice";

function Menu<T>({
  setDisplayComponent,
  displayComponent,
  links,
}: {
  displayComponent: T;
  setDisplayComponent: Dispatch<SetStateAction<T>>;
  links: { id: number; text: T; icon: JSX.Element }[];
}) {
  const dispatch = useAppDispatch();
  function handleClick(name: T) {
    console.log(name);
    setDisplayComponent(name as T);
    switch (name) {
      case "Friend Request":
        dispatch(setQueryType("Friend-Request"));
        dispatch(setPage(1));
        break;
      case "Sent Request":
        dispatch(setQueryType("Sent-Request"));
        dispatch(setPage(1));
        break;
      case "Peoples":
        dispatch(setQueryType("Peoples"));
        dispatch(setPage(1));
        break;
    }
  }
  return (
    <ul className="menu gap-2 menu-horizontal rounded-b-md w-full">
      {links.map((item) => (
        <li
          key={item.id}
          className={`${
            displayComponent === item.text
              ? "bg-primary/80 rounded-full text-primary-content"
              : ""
          } font-semibold`}
        >
          <a
            onClick={() => {
              handleClick(item.text);
            }}
          >
            {item.icon}
            {item.text as string}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
