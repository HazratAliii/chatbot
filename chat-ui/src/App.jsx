import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import InputBar from "./components/InputBar";
import axios from "axios";
import ChatHistory from "./components/ChatHistory";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [history, setHistory] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const storedConversationId = generateNewConversationId();
    setConversationId(storedConversationId);
  }, []);

  const generateNewConversationId = () => {
    return "conv_" + Math.random().toString(36).substr(2, 9);
  };

  const addMessage = async (text) => {
    setMessages((prev) => [...prev, { sender: "User", text }]);

    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/generate-content`,
        {
          user_input: text,
          conversation_id: conversationId,
        }
      );
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: data.data.content },
      ]);
    } catch (err) {
      console.log("Error ", err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setHistory={setHistory}
      />

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between p-4">
          <button
            className="md:hidden p-2 text-white bg-gray-800 rounded"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>

        {!history ? (
          <Chat messages={messages} />
        ) : (
          <ChatHistory messages={messages} />
        )}

        <InputBar addMessage={addMessage} />
      </div>
    </div>
  );
};

export default App;
