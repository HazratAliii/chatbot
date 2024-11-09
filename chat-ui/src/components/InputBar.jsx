import { useState } from "react";

const InputBar = ({ addMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      addMessage(input);
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-gray-100 border-t border-gray-300 flex">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 p-2 border border-gray-300 rounded-l-md outline-none focus:ring-2 focus:ring-indigo-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="bg-indigo-500 text-white p-2 rounded-r-md hover:bg-indigo-600 transition"
      >
        Send
      </button>
    </div>
  );
};

export default InputBar;
