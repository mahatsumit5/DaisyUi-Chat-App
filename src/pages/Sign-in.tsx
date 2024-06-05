import { FormEvent, useEffect, useState } from "react";
import { FaArrowUp, FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook";
import { useGetLoggedInUserQuery, useLoginMutation } from "../redux";
import { setUser } from "../redux/reducer/user.slice";

export function SignIn() {
  const { user } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { refetch } = useGetLoggedInUserQuery();
  const [login] = useLoginMutation();
  const [form, setform] = useState<{ email: string; password: string }>({
    email: "mahatsumit5@gmail.com",
    password: "Smith0987",
  });
  function onChange(e: FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setform({ ...form, [name]: value });
  }
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    login(form)
      .unwrap()
      .then(async ({ status, token }) => {
        if (status) {
          sessionStorage.setItem("accessJWT", token.accessJWT); ///active for 5mins
          localStorage.setItem("refreshJWT", token.refreshJWT); //active for 30days

          const data = await refetch().unwrap();
          dispatch(setUser(data));
          navigate("/chat");
        }
      })
      .catch(({ data }) => {
        console.log(data);
      });
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
    <div className=" w-full  flex sm:flex-row flex-col">
      <div className="sm:w-1/2 flex flex-col p-4 h-[100vh]">
        <div className="h-1/4">
          <h1 className="text-3xl font-bold">Chat App</h1>
        </div>
        <div className="h-3/4 flex flex-col  items-center gap-4">
          <span className="text-4xl font-bold "> Login to Your Accont</span>
          <p>Login with your socials</p>
          <div className="flex gap-4">
            <FcGoogle size={30} />
            <FaFacebookSquare size={30} color="white" />
          </div>
          <div className="flex justify-center items-center gap-4 w-[450px] ">
            <span className="border h-0 flex-1" />
            <p className="font-serif">or</p>
            <span className="border h-0 flex-1" />
            <Link to={"/chat"}>chat</Link>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
            <input
              type="text"
              placeholder="Email"
              className="p-2  bg-slate-700 rounded-full"
              name="email"
              onChange={onChange}
              value={form.email}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2  bg-slate-700 rounded-full"
              name="password"
              onChange={onChange}
              value={form.password}
            />
            <a className="text-right" href="/forgot-password">
              Forgot Password?
            </a>

            <button
              className="bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-600  font-bold"
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
        <span className=" w-full flex justify-center sm:hidden ">
          <FaArrowUp className="animate-bounce text-center" size={30} />
        </span>
      </div>
      <div className="sm:w-1/2 bg-blue-950 flex flex-col justify-center items-center gap-4 h-[100vh] ">
        <span className="text-white font-bold text-4xl">New here?</span>
        <span>Sign up, find friends and chat with your friends.</span>
        <Link to={"/sign-up"}>
          <button className="rounded-full bg-white p-3 text-black px-8">
            Join Now
          </button>
        </Link>
      </div>
    </div>
  );
}
