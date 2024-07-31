import { FormEvent, useEffect, useState } from "react";
import { FaFacebookSquare, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hook";
import { useGetLoggedInUserQuery, useLoginMutation } from "../redux";

import { users } from "../dummy_data";
import icon from "../assets/images/icon.png";
import { LoadingButton } from "../components";

const randomUserLogin = users.map((item) => {
  return { email: item.email, password: item.password };
});
export function SignIn() {
  useGetLoggedInUserQuery();
  const [passwordVisibility, setPasswordVisibility] = useState<
    "text" | "password"
  >("password");
  const { user } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading, isError }] = useLoginMutation();
  const [form, setform] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  function onChange(e: FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    let lowerCase = value;
    if (name === "email") {
      lowerCase = value.toLowerCase();
    }
    setform({ ...form, [name]: lowerCase });
  }
  async function onSubmit(e: FormEvent) {
    sessionStorage.setItem("email", form.email);

    e.preventDefault();
    await login(form).unwrap();
  }

  useEffect(() => {
    if (user) {
      return navigate(
        location.state?.from.location.pathname
          ? location.state.from.location.pathname
          : "/chat"
      );
    }
  }, [navigate, user, location]);
  return (
    <div className=" w-full  flex  flex-col items-center justify-center p-2 h-[100dvh] gap-5 ">
      <span className="text-4xl w-24 md:w-32">
        <img src={icon} />
      </span>
      <p className="font-bold text-3xl">Login with your socials</p>
      <div className="flex gap-4">
        <FcGoogle size={45} className="bg-primary p-2 rounded-xl" />
        <FaFacebookSquare
          size={45}
          color="blue"
          className="bg-primary p-2 rounded-xl"
        />
      </div>
      <div className="flex justify-center items-center gap-4 w-screen md:w-[400px] ">
        <span className="border h-0 flex-1 border-secondary" />
        <p className="font-serif ">or</p>
        <span className="border h-0 flex-1 border-secondary" />
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 w-full max-w-[400px] relative"
      >
        <input
          type="text"
          placeholder={randomUserLogin[0].email}
          className="p-2 px-3  bg-primary/60  rounded-md text-primary-content placeholder:text-primary-content/50"
          name="email"
          onChange={onChange}
          value={form.email}
        />

        <input
          type={passwordVisibility}
          placeholder={randomUserLogin[0].password}
          className="p-2 px-3 bg-primary/60  rounded-md text-primary-content relative placeholder:text-primary-content/50"
          name="password"
          onChange={onChange}
          value={form.password}
        />
        <a
          className="absolute right-2 top-16"
          onClick={() => {
            setPasswordVisibility(
              passwordVisibility === "password" ? "text" : "password"
            );
          }}
        >
          {passwordVisibility === "password" ? (
            <FaRegEye size={21} />
          ) : (
            <FaRegEyeSlash size={21} />
          )}
        </a>
        <a className="text-right " href="/forgot-password">
          Forgot Password?
        </a>

        <button
          className="bg-primary text-primary-content  py-2 px-4 rounded-lg hover:bg-primary/75 font-bold flex items-center justify-center disabled:cursor-not-allowed disabled:bg-primary/50"
          type="submit"
          disabled={!form.email || !form.password}
        >
          {isLoading ? <LoadingButton /> : "Login"}
        </button>
        {isError && <p>Something went wrong</p>}
      </form>
      <span className=" font-bold text-xl md:text-4xl">New here?</span>
      <span className="">
        Sign up, find friends and chat with your friends.
      </span>
      <Link to={"/sign-up"}>
        <button className="btn  btn-outline btn-primary ">Register Now</button>
      </Link>
    </div>
  );
}
