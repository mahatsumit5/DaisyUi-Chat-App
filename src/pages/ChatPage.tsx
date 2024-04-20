import Sidebar from "../components/Sidebar";
import ChatMenu from "../components/ChatMenu";
import Chatbox from "../components/Chatbox";

function ChatPage() {
  return (
    <div className="bg-slate-200 w-[80%] h-full rounded-md flex p-5 gap-2">
      <Sidebar />
      <ChatMenu />
      <Chatbox />
    </div>
  );
}

export default ChatPage;
