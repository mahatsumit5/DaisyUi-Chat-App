import { ActivePeople, MyFriends } from "../components";
import MenuPageLayout from "../components/MenuPageLayout";
export type displayComponentKeys = "Friends" | "Active";
const links: { id: number; text: displayComponentKeys; icon: JSX.Element }[] = [
  {
    id: 1,
    text: "Friends",
    icon: <></>,
  },
  {
    icon: <></>,
    id: 2,
    text: "Active",
  },
];
function Friends() {
  const display: Record<displayComponentKeys, JSX.Element> = {
    Friends: <MyFriends />,
    Active: <ActivePeople />,
  };
  return (
    <MenuPageLayout<displayComponentKeys>
      display={display}
      links={links}
      key={"friend"}
    />
  );
}

export default Friends;
