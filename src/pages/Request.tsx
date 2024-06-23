import { FormEvent, useEffect, useState } from "react";
import AllPeoples from "../components/Friends/AllPeoples";
import FriendReq from "../components/Friends/FriendReq";
import { useGetAllUsersQuery } from "../redux";
import { IAllUsersResponse } from "../types";
import { useAppDispatch, useAppSelector } from "../hook";
import SentRequest from "../components/Friends/SentRequest";
import { setQueryType } from "../redux/reducer/search.slice";
const Request = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((store) => store.pagination);
  const { query, type } = useAppSelector((store) => store.search);
  const numberOfContentPerPage = 8;
  const { data, error, refetch, isFetching } = useGetAllUsersQuery({
    order: "asc",
    page: page,
    take: numberOfContentPerPage,
    search: query,
  });

  useEffect(() => {
    if (type !== "Peoples") return;
    const debounce = setTimeout(() => {
      refetch();
    }, 3000);

    return () => {
      clearTimeout(debounce);
    };
  }, [page, refetch, type, query]);

  return (
    <div className="md:px-2 overflow-y-auto w-full flex flex-col gap-5">
      <div role="tablist" className="tabs tabs-lifted w-full">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab w-16"
          aria-label="Request"
          defaultChecked={type === "Friend-Request"}
          value={"Friend-Request"}
          onClick={() => {
            dispatch(setQueryType("Friend-Request"));
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
            dispatch(setQueryType("Peoples"));
          }}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box py-4 md:p-4"
        >
          <AllPeoples
            search={query}
            error={error}
            data={data as IAllUsersResponse}
            isFetching={isFetching}
            numberOfContentPerPage={numberOfContentPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Request;
