import React, { useEffect, useState } from "react";
import "../../pages/Editor/Editor.css";
import axios from "axios";

const Conversation = ({ chat_id, setActiveChat }) => {
  const [chatData, setChatData] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/getSingleChat/${chat_id}`)
      .then((response) => setChatData(response.data))
      .catch((error) => console.log(error));
  }, [chatData]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getReceiver/${chat_id}`)
      .then((response) => setReceiver(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    setMessageContent(event.target.value);
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(messageContent);
      setMessageContent("");
    }
  }

  const sendMessage = () => {
    const data = {
      chat_id: chat_id,
      content: messageContent,
    };

    axios
      .post(`http://localhost:8000/api/sendMessage`, data)
      .then((response) => {
        setChatData([...chatData, response.data]);
        setMessageContent("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div key={receiver.id} className="chat-head">
        <button type="button" onClick={() => setActiveChat(null)}>
          {"\u2190"}
        </button>
        <img src={receiver.profile_picture} alt="user" />
        <h2>{receiver.name}</h2>
      </div>

      <div className="chat-container">
        {chatData.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender_id === 4 ? "sent" : "received"
            }`}
          >
            <h4>{message.content}</h4>
          </div>
        ))}
      </div>

      <div className="message-form">
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
      </div>
    </>
  );
};

export default Conversation;
