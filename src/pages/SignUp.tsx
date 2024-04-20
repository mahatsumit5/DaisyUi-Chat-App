import { FormEvent, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";

export function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  function onChange(e: FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  }
  return (
    <div className="flex w-full h-full ">
      <div className=" flex w-1/2 flex-col p-4 px-10 gap-3 mt-20">
        <Link to={"/"} className="">
          <button className="bg-slate-200 p-2  text-black rounded-full">
            <MdOutlineArrowBackIosNew />
          </button>
        </Link>
        <h1 className=" font-bold text-3xl pt-6">Sign Up</h1>
        <span className="text-gray-500">
          Already a member?&nbsp;
          <Link to={"/sign-in"} className="underline text-blue-300">
            Log In Now
          </Link>
          <form action="" className="flex gap-8 mt-5 w-full flex-col">
            <div className="flex gap-5 justify-between">
              <input
                type="text"
                className=" w-full bg-slate-400 p-2 text-white placeholder:text-white"
                placeholder="First Name"
                name="fName"
                onChange={onChange}
              />
              <input
                type="text"
                className=" w-full bg-slate-400 p-2 text-white placeholder:text-white"
                placeholder="Last Name"
                name="lName"
                onChange={onChange}
              />
            </div>
            <input
              type="text"
              className=" w-full bg-slate-400 p-2 text-white placeholder:text-white"
              placeholder="Email"
              name="email"
              onChange={onChange}
            />
            <input
              type="text"
              className=" w-full bg-slate-400 p-2 text-white placeholder:text-white"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
            <input
              type="text"
              className=" w-full bg-slate-400 p-2 text-white placeholder:text-white"
              placeholder="Confirm Password"
              name="ConfirmPassword"
              onChange={onChange}
            />
            <button className="bg-slate-100 p-2 rounded-full text-black hover:bg-slate-400">
              Sign Up
            </button>
          </form>
        </span>
      </div>
      <div className="bg-[url('assets/images/chat2.jpg')] h-screen w-full rouned-md bg-cover bg"></div>
    </div>
  );
}
