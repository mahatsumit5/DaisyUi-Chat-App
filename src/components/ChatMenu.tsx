import React from "react";

function ChatMenu() {
  return (
    <div className="flex flex-col gap-2 w-[35%] ">
      <header className="flex bg-white rounded-xl gap-2 justify-between p-4 items-center">
        <h1 className="text-2xl text-black font-bold">Chat</h1>
        <div>
          <label className="input  flex items-center gap-2">
            <input type="text" className="" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <button className="btn btn-circle btn-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>{" "}
      </header>
      <section className="bg-white h-full rounded-xl p-4">asdf</section>
    </div>
  );
}

export default ChatMenu;
