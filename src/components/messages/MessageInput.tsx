import { PiTelegramLogoFill } from "react-icons/pi";
import { socket } from "../../utils/socket";
import { useEffect, useState } from "react";
import { LuPaperclip } from "react-icons/lu";
import { useGetMessagesQuery, useSendMessageMutation } from "../../redux";

function MessageInput(props: { id: string; userId: string }) {
  const [message, setMessage] = useState<string>("");
  const [sendMessage] = useSendMessageMutation();
  const { refetch } = useGetMessagesQuery({ roomId: props.id, num: 10 });
  async function handleSend() {
    if (!message) return;
    socket.emit("send_message", message, props.id);
    await sendMessage({
      author: props.userId,
      content: message,
      roomId: props.id,
    }).unwrap();
    refetch();
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
