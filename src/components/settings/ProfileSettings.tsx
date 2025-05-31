import { ChangeEvent, useEffect, useState } from "react"
import { useUpdateUserMutation, useUploadFileMutation } from "../../redux/api"
import LoadingButton from "../loadingButton/LoadingButton"
import { IoIosAddCircle } from "react-icons/io"
import { useAppSelector } from "../../hooks/hook"
import ChangePassword from "../user/ChangePassword"

const ProfileSettings = () => {
  const [updateUser] = useUpdateUserMutation()

  const { user } = useAppSelector(store => store.user)
  const [uploadImage, { isLoading }] = useUploadFileMutation()
  const [file, setFile] = useState<File>()
  const [preview, setPreview] = useState<string>("")
  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file as Blob)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  async function handleUpload() {
    if (!file) return
    const location = await uploadImage({ images: [file] }).unwrap()
    await updateUser({ profile: location[0] }).unwrap()
  }
  return (
    <div className="flex items-start justify-start w-full flex-col  p-2 gap-1 rounded-md ">
      <span className="text-lg font-semibold">Account</span>
      <span className="border w-full mt-2" />
      <div className="flex flex-row items-start   p-4 rounded-md w-full justify-start  gap-8 md:w-[40rem]">
        <div className="avatar relative">
          <div className="mask mask-squircle w-36">
            <img
              src={
                preview ||
                user?.profile ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
            />
          </div>
        </div>
        <input
          className=" file-input file-input-warning file-input-md hidden"
          type="file"
          id="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target
            setFile(files ? (files[0] as File) : undefined)
          }}
        />
        <div className="flex flex-col items-start justify-center h-full gap-5 w-full">
          <span className="font-semibold">Profile Picture</span>
          <label
            htmlFor="file"
            className=" flex items-center justify-center  w-full btn btn-outline btn-accent btn-md "
          >
            <IoIosAddCircle size={25} className="text-accent-content" />
            Select Image
          </label>

          <div className="w-full">
            {/* <button
              className="btn btn-md btn-primary w-full"
              onClick={handleUpload}
              disabled={!file}
            >
              {isLoading ? (
                <>
                  <LoadingButton />
                </>
              ) : (
                <>Upload</>
              )}
            </button> */}
            <LoadingButton
              type={"button"}
              handleOnClick={handleUpload}
              isLoading={isLoading}
              loadingText="Please wait..."
              className="btn-sm btn-primary w-full text-base flex justify-center"
              displayText="Upload"
              key={"UpdateProfile"}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <ChangePassword />
    </div>
  )
}

export default ProfileSettings
