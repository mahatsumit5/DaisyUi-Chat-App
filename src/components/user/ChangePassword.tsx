import { FormEvent, useState } from "react"
import { IoLockClosed } from "react-icons/io5"
import { useAppDispatch } from "../../hooks/hook"
import { toggleDialog } from "../../redux/reducer/dialog.slice"
import LoadingButton from "../loading/LoadingButton"
import { useUpdateUserMutation } from "../../redux/api"

const ChangePassword = () => {
  const dispatch = useAppDispatch()
  const [changePassword, { isLoading }] = useUpdateUserMutation()
  const [passwords, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (passwords.confirmPassword !== passwords.newPassword) {
      return dispatch(
        toggleDialog({
          content: "Password do not match",
          heading: "Alert",
          type: "password",
        })
      )
    }
    changePassword({ password: passwords.newPassword })
  }
  return (
    <div className="flex justify-start items-center w-full ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2   rounded-md items-start w-full md:w-[40rem]"
      >
        <span className="font-semibold text-lg">Change Password</span>
        <span className="text-sm text-base-content/65">Enter new password</span>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="text-left ">
            New Password
          </label>
          <label className="input input-md  flex gap-1  justify-start items-center p-0 border-primary rounded-lg   ">
            <span className="bg-base-300/35 h-full rounded-md flex items-center w-11 justify-center">
              <IoLockClosed className="text-base-content" />
            </span>
            <input
              type="password"
              placeholder="Enter new password"
              className="h-full w-full text-[16px] "
              value={passwords.newPassword}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setPassword({
                  confirmPassword: passwords.confirmPassword,
                  newPassword: e.currentTarget.value,
                })
              }}
            />
          </label>
          <label htmlFor="password" className="text-left">
            Repeat Password
          </label>
          <label className="input input-md  flex gap-1  justify-start items-center p-0 border-primary rounded-lg focus:ring-0  ">
            <span className="bg-base-300/35 h-full rounded-md flex items-center w-11 justify-center">
              <IoLockClosed className="text-base-content" />
            </span>
            <input
              type="password"
              placeholder="Confirm password"
              className="h-full w-full text-[16px]"
              value={passwords.confirmPassword}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setPassword({
                  confirmPassword: e.currentTarget.value,
                  newPassword: passwords.newPassword,
                })
              }}
            />
          </label>
        </div>
        <button
          className="btn w-full btn-sm btn-primary disabled:bg-primary-"
          type="submit"
          disabled={!passwords.newPassword}
        >
          {isLoading ? <LoadingButton /> : "Save"}
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
