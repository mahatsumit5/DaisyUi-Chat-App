import { NavigateFunction } from "react-router-dom";
import {
  getAllUsers,
  getUser,
  loginUser,
  signUpUser,
} from "../axios/user.axios";
import { setUser } from "../redux-slice/user.slice";
import { AppDispatch } from "../store";
import { setAllUsers } from "../redux-slice/AllUsers.slice";

export const loginAction =
  (form: { email: string; password: string }, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    const { status, token } = await loginUser(form);
    if (status === "success") {
      sessionStorage.setItem("accessJWT", token.accessJWT); ///active for 5mins
      localStorage.setItem("refreshJWT", token.refreshJWT); //active for 30days
      dispatch(getUserAction());
      navigate("/chat");
    }
  };

export const getUserAction = () => async (dispatch: AppDispatch) => {
  const { data } = await getUser();
  console.log(data);
  dispatch(setUser(data));
};

export const signUpAction = async (form: {
  email: string;
  password: string;
  fName: string;
  lName: string;
}) => {
  const { status } = await signUpUser(form);
  return status;
};

export const autoLogin = () => async (dispatch: AppDispatch) => {
  const token = sessionStorage.getItem("accessJWT");
  if (token) {
    dispatch(getUserAction());
  }
};

export const getAllUsersAction = () => async (dispatch: AppDispatch) => {
  const { status, data } = await getAllUsers();
  dispatch(setAllUsers(data));
};
