import { FormEvent, useEffect, useState } from "react";
import AllPeoples from "../components/Friends/AllPeoples";
import FriendReq from "../components/Friends/FriendReq";
import { useGetAllUsersQuery } from "../redux";
import { IAllUsersResponse } from "../types";
import { useAppSelector } from "../hook";
import SentRequest from "../components/Friends/SentRequest";

const Request = () => {
  const [search, setSearch] = useState<string>("");
  const [currentTab, setCurrentTab] = useState(1);
  const { page } = useAppSelector((store) => store.pagination);
  const numberOfContentPerPage = 8;
  const { data, error, refetch, isFetching } = useGetAllUsersQuery({
    order: "asc",
    page: page,
    take: numberOfContentPerPage,
    search: search,
  });

  useEffect(() => {
    if (!search) return;
    const debounce = setTimeout(() => {
      refetch();
    }, 3000);

    return () => {
      clearTimeout(debounce);
    };
  }, [search, page, refetch]);

  return (
    <div className="md:px-2 overflow-y-auto w-full flex flex-col gap-5">
      <div className="flex flex-col gap-2 md:flex-row-reverse justify-between">
        <div className="flex justify-between">
          <input
            type="text"
            className="input input-sm md:input-md input-ghost bg-slate-300 text-slate-900 w-48 md:w-80 text-[16px] md:text-lg"
            placeholder="Search............"
            onChange={(e: FormEvent<HTMLInputElement>) => {
              setSearch(e.currentTarget.value);
            }}
          />
        </div>
      </div>

      <div role="tablist" className="tabs tabs-lifted w-full">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab w-16"
          aria-label="Request"
          defaultChecked={currentTab === 1}
          value={1}
          onClick={(e: FormEvent<HTMLInputElement>) => {
            setCurrentTab(Number(e.currentTarget.value));
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
          defaultChecked={currentTab === 2}
          value={2}
          onClick={(e: FormEvent<HTMLInputElement>) => {
            setCurrentTab(Number(e.currentTarget.value));
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
          defaultChecked={currentTab === 3}
          value={3}
          onClick={(e: FormEvent<HTMLInputElement>) => {
            setCurrentTab(Number(e.currentTarget.value));
          }}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box py-4 md:p-4"
        >
          <AllPeoples
            search={search}
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
