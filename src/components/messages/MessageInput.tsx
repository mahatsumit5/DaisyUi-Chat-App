import { PiTelegramLogoFill } from "react-icons/pi";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
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
}: {
  setMessage: Dispatch<SetStateAction<string>>;
  message: string;
  id: string;
  userId: string;
  email: string;
  setStatus: Dispatch<SetStateAction<{ isLoading: boolean; isError: boolean }>>;
}) {
  const [sendMessage, { isLoading, isError }] = useSendMessageMutation();
  const { socket } = useAppSelector((store) => store.socket);

  const dispatch = useAppDispatch();
  async function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!message) return;
    const { result } = await sendMessage({
      author: userId,
      content: message,
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
  return (
    <>
      <section className=" min-h-11 flex  gap-2 ">
        <form onSubmit={handleSend} className="flex  w-full gap-1">
          <label className="flex w-full input rounded-none border-none">
            <input
              type="text"
              placeholder="Enter your message"
              className="   w-full h-full  focus:outline-primary"
              onFocusCapture={() => socket.emit("typing", id, email)}
              value={message}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setMessage(e.currentTarget.value);
              }}
            />

            <input type="file" className="hidden" id="file" />
            <label
              htmlFor="file"
              className="flex items-center justify-center w-8"
            >
              <LuPaperclip />
            </label>
            <input type="file" className="hidden" id="file" />
            <label
              htmlFor="file"
              className="flex items-center justify-center w-8"
            >
              Emo
            </label>
          </label>

          <button
            className="bg-primary disabled:bg-base-content  flex justify-center items-center  w-14"
            disabled={isLoading || !message}
          >
            <PiTelegramLogoFill className="text-primary-content" size={20} />
          </button>
        </form>
      </section>
    </>
  );
}

export default MessageInput;
