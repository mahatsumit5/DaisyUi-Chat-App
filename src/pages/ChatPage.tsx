import ChatMenu from "../components/ChatMenu";
import Chatbox from "../components/Chatbox";

function ChatPage() {
  return (
    <>
      <ChatMenu />
      <div className="hidden lg:block w-full">
        <Chatbox />
      </div>
    </>
  );
}

export default ChatPage;
