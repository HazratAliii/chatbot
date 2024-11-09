import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../store/historyStore";

const Sidebar = ({ isOpen, toggleSidebar, setHistory }) => {
  const [convIds, setConvIds] = useState([]);
  const { setConvId } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/distinct-conversations`
      );
      setConvIds(data.data.conversation_ids);
    };
    fetchData();
  }, []);

  const handleClick = (conv_id) => {
    setHistory(true);
    setConvId(conv_id);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-white md:hidden"
        onClick={toggleSidebar}
      >
        ✕
      </button>
      <h1 className="text-xl font-bold mb-4">Menu</h1>
      <ul className="gap-5">
        {convIds.map((conv_id) => (
          <li
            className="cursor-pointer"
            key={conv_id}
            onClick={() => handleClick(conv_id)}
          >
            {conv_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
