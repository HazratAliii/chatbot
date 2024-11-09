const Chat = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white">
      {messages.map((msg, index) => (
        <div key={index} className="mb-4">
          <p className="text-sm text-gray-500">{msg.sender}:</p>
          <p
            className={`text-base p-3 rounded-md max-w-md ${
              msg.sender === "User" ? "bg-gray-200" : "bg-green-200"
            }`}
          >
            {msg.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
