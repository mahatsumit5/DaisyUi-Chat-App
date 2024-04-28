import Sidebar from "../components/Sidebar";
import ChatMenu from "../components/ChatMenu";
import Chatbox from "../components/Chatbox";

function ChatPage() {
  return (
    <div className="bg-slate-200 w-full lg:w-[80%] h-[100vh] rounded-md flex px-5 py-5 gap-2">
      {" "}
      <Sidebar />
      <ChatMenu />
      <div className="hidden lg:block w-full">
        <Chatbox />
      </div>
    </div>
  );
}

export default ChatPage;
