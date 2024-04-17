import ChatMenu from "./components/ChatMenu";
import Chatbox from "./components/Chatbox";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="h-screen bg-slate-900 flex justify-center items-center py-10">
      <div className="bg-slate-200 w-[80%] h-full rounded-md flex p-5 gap-2">
        <Sidebar />
        <ChatMenu />
        <Chatbox />
      </div>
    </div>
  );
}
