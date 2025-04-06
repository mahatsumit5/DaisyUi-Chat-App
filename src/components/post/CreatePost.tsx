import { RxCross2 } from "react-icons/rx"
import { useAppSelector } from "../../hooks/hook"
import { ChangeEvent, FormEvent, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FcAddImage, FcImageFile } from "react-icons/fc"
import { useCreatePostMutation } from "../../redux"
import LoadingButton from "../loading/LoadingButton"
import { MdOutlineCreate } from "react-icons/md"
import { TiDelete } from "react-icons/ti"
import { Avatar } from "../Avatar/Avatar"
import { extractInitial } from "../../utils"
import { useUploadFileMutation } from "../../redux/api/fileUpload.api"
// import { gql, useMutation } from "@apollo/client"
// const CREATE_POST = gql`
//   mutation Mutation($body: PostInput) {
//     uploadPost(body: $body) {
//       status
//       message
//       result {
//         createdAt
//         title
//         id
//         content
//         author {
//           id
//           email
//           fName
//           lName
//           profile
//         }
//       }
//     }
//   }
// `
const CreatePost = () => {
  const [uploadImage] = useUploadFileMutation()
  // const [createPostGQL] = useMutation(CREATE_POST)
  const [images, setImages] = useState<File[]>([])
  const [createPost, { isLoading }] = useCreatePostMutation()
  const [form, setForm] = useState({ title: "", content: "" })
  const { user } = useAppSelector(store => store.user)
  const [expandInput, setExpandInput] = useState<boolean>(false)

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget
    setForm({ ...form, [name]: value })
  }

  function handleRemoveImage(file: File) {
    if (!images) return
    setImages(images.filter(item => item.name !== file.name))
  }
  async function handleCreatePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    uploadImage({ images })
    console.log(images)
    return
    await createPost({ ...form, id: user?.id as string, images }).unwrap()
    setForm({ title: "", content: "" })
    setImages([])
    setExpandInput(false)
  }

  return user ? (
    <motion.form
      className="bg-base-100 rounded-lg p-4 flex flex-col gap-5 overflow-hidden min-h-20 "
      initial={{ opacity: 0, height: "80px" }}
      animate={{ opacity: 1, height: expandInput ? "auto" : "80px" }}
      onSubmit={handleCreatePost}
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            url={user?.profile}
            classname="w-11"
            initial={extractInitial(user.fName, user.lName)}
          />
          <span className="flex flex-col">
            <p className="font-bold text-sm md:text-lg">{`${user?.fName} ${user?.lName}`}</p>
            <p className="no-underline hidden md:block text-base-content/45">
              {user?.email}
            </p>
          </span>
        </div>

        <button
          className="btn btn-sm btn-circle  flex btn-primary"
          onClick={() => setExpandInput(!expandInput)}
          type="button"
        >
          {expandInput ? (
            <>
              <RxCross2 size={20} />
            </>
          ) : (
            <MdOutlineCreate size={20} />
          )}
        </button>
      </div>

      {/* input fields */}
      <input
        className="input bg-base-200 focus:outline-none p-2 text-left rounded-xl focus:border-primary focus:border-2"
        placeholder="Title"
        type="text"
        name="title"
        onChange={handleInputChange}
        value={form.title}
      />
      <textarea
        name="content"
        className="bg-base-200 h-52 p-2 focus:border-primary focus:outline-none input text-left resize-none rounded-xl focus:border-2"
        placeholder="What's on your mind?"
        onChange={handleInputChange}
        value={form.content}
      />
      <span className="border-b" />
      {/* file and button */}
      <div className="flex justify-between items-center">
        <input
          type="file"
          className="hidden"
          id="image"
          accept=".jpg,.avif,.png,.jpeg"
          multiple
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target
            if (!files?.length) return
            setImages(Object.values(files))
          }}
        />
        <label
          htmlFor="image"
          className="btn btn-square btn-primary btn-outline"
        >
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

      {/* Selected Images */}
      {images?.length ? (
        <div className="flex flex-col gap-2">
          <span className="">{images.length} images selected.</span>
          {images.map((item, index) => (
            <AnimatePresence>
              <motion.div
                key={index}
                className="flex gap-2 items-center bg-base-200 p-2 rounded-md justify-between"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                exit={{ y: -100, opacity: 0 }}
              >
                <p className="flex gap-2 text-primary/60">
                  <FcImageFile size={30} /> {item.name}
                </p>

                <button
                  className="btn btn-sm btn-circle text-right"
                  type="button"
                  onClick={() => {
                    handleRemoveImage(item)
                  }}
                >
                  <TiDelete size={20} className=" text-error" />
                </button>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : null}
    </motion.form>
  ) : null
}

export default CreatePost
