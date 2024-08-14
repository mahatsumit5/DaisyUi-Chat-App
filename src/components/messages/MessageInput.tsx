import { PiTelegramLogoFill } from "react-icons/pi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSendMessageMutation } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hook";
import { CiImageOn } from "react-icons/ci";
import LoadingButton from "../loading/LoadingButton";
import useMessageHook from "../../hooks/useMessage.hook";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";
import EmojiBox from "../Emoji/EmojiBox";
function MessageInput({ email, roomId, userId }: messageInputProps) {
  const dispatch = useAppDispatch();
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const {
    file,
    message,
    preview,
    numOfMessages,
    setFile,
    setMessage,
    setPreview,
    setMessageStatus,
  } = useMessageHook();

  const [sendMessage, { isLoading, isError }] = useSendMessageMutation();
  const { socket } = useAppSelector((store) => store.socket);
  async function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!message && !file) return;
    const { result } = await sendMessage({
      author: userId,
      content: file ? file : message,
      roomId,
      numOfMessages,
    }).unwrap();
    setFile(undefined);
    setPreview("");
    if (!isLoading && !isError) {
      socket.emit("send_message", result, roomId);
      setMessage("");
    }
  }
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file as Blob);
    console.log(url);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, setPreview]);

  useEffect(() => {
    setMessageStatus({ isError, isLoading });
  }, [isError, isLoading, setMessageStatus, dispatch]);

  return (
    <>
      <form
        onSubmit={handleSend}
        className="flex  w-full gap-2 flex-col p-2 border-t-2 overflow-y-hidden "
      >
        <textarea
          placeholder="Enter your message"
          className="   w-full  textarea textarea-bordered textarea-ghost h-24 text-[16px] focus:outline-none  focus:shadow-lg focus:border-primary"
          onFocusCapture={() => socket.emit("typing", roomId, email)}
          value={message}
          onChange={(e: FormEvent<HTMLTextAreaElement>) => {
            setMessage(e.currentTarget.value);
          }}
          onBlur={() => socket.emit("stopped_typing", roomId, email)}
        />

        {/* buttons */}
        <div className="flex  gap-3 ">
          <label htmlFor="file" className="btn-sm btn-square btn">
            <CiImageOn size={20} />
          </label>
          <button
            className="btn-sm btn-square btn text-xl"
            onClick={() => setEmojiOpen(!emojiOpen)}
            type="button"
          >
            {String.fromCodePoint(0x1f60a)}
          </button>
          <div className="flex-1 text-end">
            <button
              className="btn btn-primary btm-nav-sm text-primary-content btn-outline disabled:btn-disabled"
              disabled={isLoading || (!message && !file)}
            >
              {isLoading ? (
                <LoadingButton />
              ) : (
                <>
                  Send <PiTelegramLogoFill className="" size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* image */}
        <motion.div
          className="flex gap-2 items-center w-full  p-2 border-t bg-base-200 rounded-md hover:shadow-md"
          animate={file?.name ? "open" : "closed"}
          transition={{ ease: "easeIn", duration: 0.7 }}
          variants={{
            open: { x: 0, opacity: 1, height: "auto", display: "flex" },
            closed: { x: -500, opacity: 0, height: 0, display: "hidden" },
          }}
        >
          <img src={preview} alt="preview" height={50} width={50} />
          <p className="text-sm font-semibold">{file?.name}</p>
          <div className="flex-1 text-end">
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => {
                setFile(undefined);
              }}
            >
              <RxCross1 />
            </button>
          </div>
        </motion.div>

        {/* emoji */}

        <EmojiBox
          isOpen={emojiOpen}
          setEmojiOpen={setEmojiOpen}
          setMessage={setMessage}
        />
      </form>

      <input
        type="file"
        className="hidden"
        id="file"
        accept=".jpg,.avif,.png,.jpeg"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { files } = e.target;
          setFile(files ? (files[0] as File) : undefined);
        }}
      />
    </>
  );
}

export default MessageInput;
type messageInputProps = {
  roomId: string;
  userId: string;
  email: string;
};
