import { PiTelegramLogoFill } from "react-icons/pi";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
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
}: {
  setMessage: Dispatch<SetStateAction<string>>;
  message: string;
  id: string;
  userId: string;
  email: string;
  setStatus: Dispatch<SetStateAction<{ isLoading: boolean; isError: boolean }>>;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
}) {
  const [sendMessage, { isLoading, isError }] = useSendMessageMutation();
  const { socket } = useAppSelector((store) => store.socket);

  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file as Blob);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  const dispatch = useAppDispatch();
  async function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!message && !file) return;
    const { result } = await sendMessage({
      author: userId,
      content: file ? file : message,
      roomId: id,
    }).unwrap();
    if (!isLoading && !isError) {
      socket.emit("send_message", result, id);
      setMessage("");
    }
  }

  useEffect(() => {
    setStatus({ isError, isLoading });
  }, [isError, isLoading, setStatus, dispatch, id]);
  console.log(file);
  return (
    <>
      <section className=" min-h-14 h-auto flex  gap-2  flex-1">
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
                console.log(e);
                const { files } = e.target;
                console.log(files);
                setFile(files ? (files[0] as File) : undefined);
              }}
            />
          </label>

          <div className="">
            <button
              className="bg-primary disabled:bg-primary/25  flex justify-center items-center  w-14 h-14"
              disabled={isLoading || (!message && !file)}
            >
              <PiTelegramLogoFill className="text-primary-content" size={20} />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default MessageInput;
