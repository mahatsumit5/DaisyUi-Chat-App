import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from "../../hook";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FcAddImage } from "react-icons/fc";
import { useCreatePostMutation } from "../../redux";
import LoadingButton from "../loading/LoadingButton";
import { MdOutlineCreate } from "react-icons/md";
const CreatePost = () => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [form, setForm] = useState({ title: "", content: "" });
  const { user } = useAppSelector((store) => store.user);
  const [expandInput, setExpandInput] = useState<boolean>(false);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  }
  async function handleCreatePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createPost({ ...form, id: user?.id as string }).unwrap();
  }
  return (
    <motion.form
      className="bg-base-100 rounded-3xl p-4 flex flex-col gap-5 overflow-hidden"
      initial={{ opacity: 0, height: "80px" }}
      animate={{ opacity: 1, height: expandInput ? "450px" : "80px" }}
      onSubmit={handleCreatePost}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className=" w-12 h-12 rounded-full ">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <span className="flex flex-col">
            <p className="font-bold text-sm md:text-lg">{`${user?.fName} ${user?.lName}`}</p>
            <p className="no-underline hidden md:block">{user?.email}</p>
          </span>
        </div>

        <button
          className="btn btn-circle btn-ghost flex"
          onClick={() => setExpandInput(!expandInput)}
          type="button"
        >
          {expandInput ? (
            <>
              <RxCross2 size={30} />
            </>
          ) : (
            <MdOutlineCreate size={30} />
          )}
        </button>
      </div>
      <input
        className="bg-base-200  p-2 text-left rounded-xl"
        placeholder="Title"
        type="text"
        name="title"
        onChange={handleInputChange}
        value={form.title}
      />
      <textarea
        name="content"
        className="bg-base-200 h-52 p-2 text-left resize-none rounded-xl"
        placeholder="What's on your mind?"
        onChange={handleInputChange}
        value={form.content}
      />
      <span className="border-b" />
      <div className="flex justify-between items-center">
        <input
          type="file"
          className="hidden"
          id="image"
          accept=".jpg,.avif,.png,.jpeg"
          multiple
        />
        <label htmlFor="image" className="btn">
          <FcAddImage size={35} />
        </label>

        <button
          className="btn btn-square btn-primary w-28 text-lg"
          type="submit"
          disabled={!form.title}
        >
          {isLoading ? <LoadingButton /> : "Post"}
        </button>
      </div>
    </motion.form>
  );
};

export default CreatePost;
