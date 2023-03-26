import React, { useState, useEffect } from "react";
import axios from "axios";
import receiver_image from "../../images/profile-pic.png";
// import "./Chat.css";
import search from "../../images/search.png";

function ChatList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/getSingleChat/1")
      .then((response) => setMessages(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="chat">
        {messages.map((message) => (
          <div key={message.id}>
            <h4>{message.content}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChatList;
