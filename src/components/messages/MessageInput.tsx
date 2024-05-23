import { PiTelegramLogoFill } from "react-icons/pi";
import { socket } from "../../utils/socket";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hook";
import { postMessageAction } from "../../action/message.action";
import { LuPaperclip } from "react-icons/lu";

function MessageInput(props: { id: string; userId: string }) {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>("");

  async function handleSend() {
    if (!message) return;
    socket.emit("send_message", message, props.id);

    dispatch(
      postMessageAction({ message, roomId: props.id, author: props.userId })
    );
    setMessage("");
  }

  useEffect(() => {
    socket.on("typing", (id) => {
      console.log(id, "is typing");
    });
  }, []);
  return (
    <section className=" h-11   flex  gap-2 ">
      <div className="flex flex-1 bg-white rounded-lg gap-5">
        <input
          className="w-full h-full p-3 rounded-xl bg-white focus:ring-2"
          placeholder="Write your message "
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onInputCapture={() => {
            socket.emit("typing", props.id);
          }}
        />
        <input type="file" className="hidden" id="file" />
        <label htmlFor="file" className="flex items-center justify-center w-8">
          <LuPaperclip />
        </label>
      </div>
      <button
        className="bg-red-600  flex justify-center items-center rounded-xl w-14"
        onClick={handleSend}
      >
        <PiTelegramLogoFill color="white" size={20} />
      </button>
    </section>
  );
}

export default MessageInput;
