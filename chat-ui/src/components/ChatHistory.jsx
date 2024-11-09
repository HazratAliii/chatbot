import axios from "axios";
import React, { useEffect, useState } from "react";
import useStore from "../store/historyStore";
const ChatHistory = () => {
  const { convId } = useStore();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/conversation-data/${convId}`
        );
        setMessages(response.data.conversation_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (convId) {
      fetchData();
    }
  }, [convId]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white">
      {messages.map((msg, index) => (
        <div key={index} className="mb-4 text-black">
          <p className="text-sm text-gray-500">User:</p>
          <p className="text-base p-3 rounded-md max-w-md bg-gray-200">
            {msg.user_input}
          </p>
          <p className="text-sm text-gray-500">AI:</p>
          <p className="text-base p-3 rounded-md max-w-md bg-green-200">
            {msg.response}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
