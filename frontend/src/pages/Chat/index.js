import React, { useState, useEffect } from "react";
import axios from "axios";
import receiver_image from "../../images/profile-pic.png";
import "./Chat.css";
import search from "../../images/search.png";

function ChatList() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/getChats")
      .then((response) => setChats(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="nav">
        <h1>CODING</h1>
        <div>
          <img src={search} className="search" />
        </div>
      </div>
      <div className="chats">
        <h2>Chats</h2>
        <div>
          {chats.map((chat) => (
            <div key={chat.id} className="chat-card">
              <img src={chat.user.profile_picture} alt="User" />
              <h2>
                {chat.user.name.charAt(0).toUpperCase() +
                  chat.user.name.slice(1)}
              </h2>
              {/* <img src={`http://127.0.0.1:8000/${chat.image_url}`} alt="User" /> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChatList;
