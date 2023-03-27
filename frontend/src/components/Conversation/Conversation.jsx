import React, { useEffect, useState } from "react";
import "../../pages/Editor/Editor.css";
import axios from "axios";

const Conversation = ({ chat_id }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [receiver, setReceiver] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/getSingleChat/${chat_id}`)
      .then((response) => setChatData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getReceiver")
      .then((response) => setReceiver(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <div key={receiver.id} className="chat-head">
          <button type="button" onClick={() => setActiveChat(null)}>
            {"\u2190"}
          </button>
          <img src={receiver.profile_picture} alt="user" />
          <h2>{receiver.name}</h2>
        </div>
      </div>
      <div className="chat-head"></div>
      <div className="chat-container">
        <div>
          {chatData.map((message) => (
            <div key={message.id}>
              <h4>{message.content}</h4>
            </div>
          ))}
        </div>
        {/* <div>
          <form>
            <input
              className="message-input"
              type="text"
              placeholder="Type a message..."
              value={messageContent}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </form>
        </div> */}
      </div>
    </>
  );
};

export default Conversation;
