import React from "react";

function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className=" bg-slate-400 p-8 rounded-md flex flex-col gap-5 items-center ">
        <span className="text-black font-bold text-2xl">
          Welcome to blah blah
        </span>
        <span className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
        </span>

        <div className="flex gap-2">
          <button className=" bg-slate-200 p-3 text-black font-semibold rounded-lg">
            Login with Goggle
          </button>
          <button className=" bg-slate-200 p-3 text-black font-semibold rounded-lg">
            Login with Facebook
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white p-5 gap-4">
        <span className="text-2xl text-black font-bold">Login</span>

        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-bold font-bold text-black ">
            {" "}
            Email
          </label>
          <input
            type="text"
            className="w-56 bg-slate-400 rounded-md p-2 placeholder:text-gray-200 text-white"
            placeholder="jonhSmith@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-bold font-bold text-black ">
            {" "}
            PAssword
          </label>
          <input
            type="text"
            className="w-56 bg-slate-400 rounded-md p-2 placeholder:text-gray-200 text-white"
            placeholder="****************"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
