import { PiTelegramLogoFill } from "react-icons/pi";
import { socket } from "../../utils/socket";
import { useEffect, useState } from "react";
import { LuPaperclip } from "react-icons/lu";
import { useGetMessagesQuery, useSendMessageMutation } from "../../redux";

function MessageInput(props: { id: string; userId: string; email: string }) {
  const [message, setMessage] = useState<string>("");
  const [sendMessage] = useSendMessageMutation();
  const { refetch } = useGetMessagesQuery({
    roomId: props.id,
    num: 10,
  });
  async function handleSend() {
    if (!message) return;
    await sendMessage({
      author: props.userId,
      content: message,
      roomId: props.id,
    }).unwrap();
    refetch();
    socket.emit("send_message", message, props.id);
    setMessage("");
  }

  useEffect(() => {
    socket.on("send_message_client", (data) => {
      console.log(data);
      refetch();
    });
  }, [refetch]);

  return (
    <section className=" h-11   flex  gap-2 ">
      <div className="flex flex-1 bg-white rounded-lg gap-5" id="input-field">
        <input
          className="w-full h-full p-3 rounded-xl bg-white focus:ring-2"
          placeholder="Write your message "
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onBlur={() => {
            socket.emit("stopped_typing", props.id, props.email);
          }}
          onFocusCapture={() => socket.emit("typing", props.id, props.email)}
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
