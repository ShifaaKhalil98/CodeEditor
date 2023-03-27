import React, { useEffect, useState } from "react";
import "../../pages/Editor/Editor.css";
import axios from "axios";
import ChatCard from "../../components/ChatCard/ChatCard";
import Conversation from "../../components/Conversation/Conversation";

const ChatsList = ({ onChatClick }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const handleChatClick = (chat_id) => {
    setActiveChat(chat_id);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/getChats")
      .then((response) => setChats(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {activeChat ? null : (
        <>
          <h2>Chats</h2>
          {chats.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              onChatClick={() => handleChatClick(chat.id)}
            />
          ))}
        </>
      )}

      {activeChat && (
        <Conversation
          chat_id={chats.find((chat) => chat.id === activeChat)?.id}
          setActiveChat={setActiveChat}
        />
      )}
    </div>
  );
};

export default ChatsList;
