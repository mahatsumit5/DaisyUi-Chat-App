import { ChangeEvent, useEffect, useState } from "react";
import { useUploadImageMutation } from "../../redux";
import LoadingButton from "../loading/LoadingButton";
import { IoIosAddCircle } from "react-icons/io";
import { useAppSelector } from "../../hook";
import ChangePassword from "../user/ChangePassword";

const ProfileSettings = () => {
  const { user } = useAppSelector((store) => store.user);
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file as Blob);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function handleUpload() {
    if (!file) return;
    await uploadImage(file);
  }
  return (
    <div className="flex items-start justify-start w-full flex-col bg-base-100 p-2 gap-3 rounded-md h-[79dvh] overflow-y-scroll">
      <span className="text-lg font-semibold">Account</span>
      <p className="text-base-content/65">Manage your profile</p>
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
            const { files } = e.target;
            setFile(files ? (files[0] as File) : undefined);
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
            <button
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
            </button>
          </div>
        </div>
      </div>
      <ChangePassword />
    </div>
  );
};

export default ProfileSettings;
