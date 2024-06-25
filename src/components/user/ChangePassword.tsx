import { FormEvent, useState } from "react";
import { IoLockClosed } from "react-icons/io5";
import { useAppDispatch } from "../../hook";
import { toggleDialog } from "../../redux/reducer/dialog.slice";
import { useChangePasswordMutation } from "../../redux";
import LoadingButton from "../loading/LoadingButton";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [passwords, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (passwords.confirmPassword !== passwords.newPassword) {
      return dispatch(
        toggleDialog({
          content: "Password do not match",
          heading: "Alert",
        })
      );
    }
    changePassword({ password: passwords.newPassword });
  }
  return (
    <div className="flex justify-center items-center w-full ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-base-100 p-4 rounded-md items-center w-[20rem]"
      >
        <span className="font-bold">Password Reset</span>
        <span className="text-sm">Enter new password</span>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="text-left text-accent-content">
            New Password
          </label>
          <label className="input input-md  flex gap-1 border-base-300 justify-start items-center p-0">
            <span className="bg-base-300/35 h-full rounded-md flex items-center w-11 justify-center">
              <IoLockClosed className="text-base-content" />
            </span>
            <input
              type="text"
              placeholder="Enter new password"
              className="h-full w-full"
              value={passwords.newPassword}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setPassword({
                  confirmPassword: passwords.confirmPassword,
                  newPassword: e.currentTarget.value,
                });
              }}
            />
          </label>
          <label htmlFor="password" className="text-left">
            Repeat Password
          </label>
          <label className="input input-md  flex gap-1 border-base-300 justify-start p-0">
            <span className="bg-base-300/35 h-full rounded-md flex items-center w-11 justify-center">
              <IoLockClosed className="text-base-content" />
            </span>
            <input
              type="text"
              placeholder="Confirm password"
              className="h-full w-full"
              value={passwords.confirmPassword}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setPassword({
                  confirmPassword: e.currentTarget.value,
                  newPassword: passwords.newPassword,
                });
              }}
            />
          </label>
        </div>
        <button className="btn w-full btn-sm btn-primary" type="submit">
          {isLoading ? <LoadingButton /> : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
