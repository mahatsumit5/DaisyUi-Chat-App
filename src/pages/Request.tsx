import AllPeoples from "../components/Friends/AllPeoples";
import FriendReq from "../components/Friends/FriendReq";

import { useAppDispatch, useAppSelector } from "../hook";
import SentRequest from "../components/Friends/SentRequest";
import { setQueryType } from "../redux/reducer/search.slice";
import { setPage } from "../redux/reducer/pagination.slice";
const Request = () => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector((store) => store.search);

  return (
    <div className="md:px-2 overflow-y-auto w-full flex flex-col gap-5">
      <div role="tablist" className="tabs tabs-lifted w-full">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab w-16"
          aria-label="Request"
          defaultChecked={true}
          value={"Friend-Request"}
          onClick={() => {
            dispatch(setQueryType("Friend-Request"));
            dispatch(setPage(1));
          }}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-4 py-4 w-full flex"
        >
          <FriendReq />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab w-16"
          aria-label="Sent_Request"
          defaultChecked={type === "Sent-Request"}
          value={"Sent-Request"}
          onClick={() => {
            dispatch(setPage(1));
            dispatch(setQueryType("Sent-Request"));
          }}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-4 py-4 w-full"
        >
          <SentRequest />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab min-w-16"
          aria-label="Peoples"
          defaultChecked={type === "Peoples"}
          value={"Peoples"}
          onClick={() => {
            dispatch(setPage(1));
            dispatch(setQueryType("Peoples"));
          }}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box py-4 md:p-4"
        >
          <AllPeoples />
        </div>
      </div>
    </div>
  );
};

export default Request;
