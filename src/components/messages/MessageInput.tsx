import { PiTelegramLogoFill } from "react-icons/pi";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from "react";
import { LuPaperclip } from "react-icons/lu";
import { useSendMessageMutation } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hook";

function MessageInput({
  email,
  message,
  setMessage,
  id,
  setStatus,
  userId,
  file,
  setFile,
  preview,
  setPreview,
}: messageInputProps) {
  const [sendMessage, { isLoading, isError }] = useSendMessageMutation();
  const { socket } = useAppSelector((store) => store.socket);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file as Blob);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, setPreview]);
  const dispatch = useAppDispatch();

  async function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!message && !file) return;
    const { result } = await sendMessage({
      author: userId,
      content: file ? file : message,
      roomId: id,
    }).unwrap();
    setFile(undefined);
    setPreview("");
    if (!isLoading && !isError) {
      socket.emit("send_message", result, id);
      setMessage("");
    }
  }

  useEffect(() => {
    setStatus({ isError, isLoading });
  }, [isError, isLoading, setStatus, dispatch, id]);
  return (
    <>
      <section className=" min-h-14 h-auto flex  gap-2 ">
        <form onSubmit={handleSend} className="flex  w-full gap-1">
          <label className="flex w-full input rounded-none border-none">
            {file ? (
              <div className="avatar">
                <div className="w-24 rounded">
                  <img
                    src={
                      preview ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                  />
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Enter your message"
                className="   w-full h-full  focus:outline-primary"
                onFocusCapture={() => socket.emit("typing", id, email)}
                value={message}
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  setMessage(e.currentTarget.value);
                }}
                onBlur={() => socket.emit("stopped_typing", id, email)}
              />
            )}

            <label
              htmlFor="file"
              className="flex items-center justify-center w-8"
            >
              <LuPaperclip />
            </label>
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
          </label>

          <div className="">
            <button
              className="bg-primary disabled:bg-primary/45  flex justify-center items-center  w-20 h-14"
              disabled={isLoading || (!message && !file)}
            >
              {isLoading ? (
                <svg
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
              ) : (
                <PiTelegramLogoFill
                  className="text-primary-content"
                  size={20}
                />
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default MessageInput;
type messageInputProps = {
  setMessage: Dispatch<SetStateAction<string>>;
  message: string;
  id: string;
  userId: string;
  email: string;
  setStatus: Dispatch<SetStateAction<{ isLoading: boolean; isError: boolean }>>;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
};
