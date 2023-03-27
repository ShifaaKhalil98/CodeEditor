import React, { useEffect, useState } from "react";
import "../../pages/Editor/Editor.css";
import axios from "axios";

const ChatCard = ({ chat, onChatClick }) => {
  return (
    <div
      className="chat-card"
      onClick={() =>
        onChatClick(chat.id, chat.user.profile_picture, chat.user.name)
      }
    >
      <img src={chat.user.profile_picture} alt="User" />
      <h2>
        {chat.user.name.charAt(0).toUpperCase() + chat.user.name.slice(1)}
      </h2>
    </div>
  );
};

export default ChatCard;
