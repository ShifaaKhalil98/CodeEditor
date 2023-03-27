import React, { useEffect, useState } from "react";
import "../../pages/Editor/Editor.css";
import axios from "axios";
import ChatCard from "../../components/ChatCard/ChatCard";
import Conversation from "../../components/Conversation/Conversation";

const ChatsList = ({ onChatClick, userID }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [direct_chat_id, setDirectChatID] = useState();

  const handleChatClick = (chat_id) => {
    setActiveChat(chat_id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/getChats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setChats(response.data))
        .catch((error) => console.log(error));
    }

    if(userID) {
      setDirectChatID(userID)
      console.log('direcctt', userID)
    }
  }, []);

  return (
    <div>
      {activeChat || userID ? null : (
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

      {activeChat && !direct_chat_id && (
        <Conversation
          chat_id={chats.find((chat) => chat.id === activeChat)?.id}
          setActiveChat={setActiveChat}
        />
      )}

      {userID && (
        <Conversation
        chat_id={userID}
        setActiveChat={setActiveChat}
      />
      )}
    </div>
  );
};

export default ChatsList;
