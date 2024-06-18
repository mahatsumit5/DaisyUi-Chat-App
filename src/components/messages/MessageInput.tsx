import { PiTelegramLogoFill } from "react-icons/pi";
import { socket } from "../../utils/socket";
import { Dispatch, SetStateAction, useEffect } from "react";
import { LuPaperclip } from "react-icons/lu";
import { useSendMessageMutation } from "../../redux";
import { useAppDispatch } from "../../hook";

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

  const dispatch = useAppDispatch();
  async function handleSend() {
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
    <section className=" min-h-11 flex  gap-2 ">
      <div className="flex flex-1 bg-white rounded-lg gap-5" id="input-field">
        <input
          className="w-full h-full p-3 rounded-xl bg-white focus:ring-2"
          placeholder="Write your message "
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onBlur={() => {
            socket.emit("stopped_typing", id, email);
          }}
          onFocusCapture={() => socket.emit("typing", id, email)}
        />
        <input type="file" className="hidden" id="file" />
        <label htmlFor="file" className="flex items-center justify-center w-8">
          <LuPaperclip />
        </label>
      </div>
      <button
        className="bg-red-600 disabled:bg-gray-400  flex justify-center items-center rounded-xl w-14"
        onClick={handleSend}
        disabled={isLoading || !message}
      >
        <PiTelegramLogoFill color="white" size={20} />
      </button>
    </section>
  );
}

export default MessageInput;
