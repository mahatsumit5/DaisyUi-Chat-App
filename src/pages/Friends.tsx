import ActivePeople from "../components/Friends/ActivePeople";
import YourFriends from "../components/Friends/Friends";

function Friends() {
  return (
    <div className="flex flex-col  w-full  gap-5">
      <div role="tablist" className="tabs tabs-lifted tabs-lg">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Friends"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <YourFriends />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Active"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box  p-6"
        >
          <ActivePeople />
        </div>
      </div>
    </div>
  );
}

export default Friends;
