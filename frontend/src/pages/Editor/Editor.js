import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Editor.css";
import messages_pic from "../../images/bubble.png";
import search_pic from "../../images/search.png";
import files_pic from "../../images/folder.png";
import loading_pic from "../../images/loading.gif";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import UserCard from "../../components/UserCard/UserCard";
import FileCard from "../../components/FileCard/FileCard";
import ChatsList from "../../components/ChatsList/ChatsList";

export default function Editor() {
  const navigate = useNavigate();
  const [signed_in, setSignedIn] = useState(false);
  const [user_photo, setUserPhoto] = useState();
  const [console_open, setConsoleOpen] = useState(false);
  const [sidebar_open, setSidebarOpen] = useState(false);
  const [sidebar_selected, setSidebarSelected] = useState("");
  const [code, setCode] = useState("");
  const [compiled_result, setCompiledResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [search_val, setSearchVal] = useState("");
  const [search_res, setSearchRes] = useState([]);
  // const [activeChat, setActiveChat] = useState(null);
  // const [chatData, setChatData] = useState([]);
  // const [chats, setChats] = useState([]);
  // const [receiver, setReceiver] = useState([]);
  const [is_readonly, setReadOnly] = useState(true);
  // const [messageContent, setMessageContent] = useState("");
  const [filename, setFilename] = useState("");
  const [user_files, setUserFiles] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const code_data = new FormData();
      code_data.append("content", code);
      code_data.append("name", filename);
      axios
        .post("http://localhost:8000/api/savefile", code_data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPopupOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSaveClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      if (code.length > 0) {
        setFilename("");
        setPopupOpen(true);
      }
    } else {
      navigate(`/Login_Register`);
    }
  };

  const openFile = (id, content) => {
    setCode(content);
  };

  // const handleInputChange = (event) => {
  //   setMessageContent(event.target.value);
  // };

  // function handleKeyDown(e) {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     sendMessage(messageContent);
  //     setChatData("");
  //   }
  // }

  // const sendMessage = () => {
  //   // event.preventDefault();
  //   const data = {
  //     chat_id: activeChat.id,
  //     content: messageContent,
  //   };
  //   axios
  //     .post(`http://localhost:8000/api/sendMessage`, data)
  //     .then((response) => {
  //       setChatData([...chatData, response.data]);
  //       setMessageContent("");
  //     })
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    if (search_val.length > 0) {
      axios
        .get(`http://localhost:8000/api/search?q=${search_val}`)
        .then((res) => {
          console.log(res.data);
          setSearchRes(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setSearchRes([]);
    }
  }, [search_val]);

  const getFiles = () => {
    const token = " ";
    if (token) {
      axios
        .get(`http://localhost:8000/api/getfiles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setUserFiles(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  const openSideBar = (selected) => {
    (selected == sidebar_selected || !sidebar_open) &&
      setSidebarOpen(!sidebar_open);
    setSidebarSelected(selected);
  };

  const compile = (input) => {
    if (/\b(input|raw_input)\(/.test(code) && !input) {
      setConsoleOpen(true);
      setCompiledResult(code.match(/input\(['"](.*)['"]\)/)[1] + ": ");
      setReadOnly(false);
    } else {
      setConsoleOpen(true);
      setLoading(true);
      const code_data = new FormData();
      code_data.append("code", code);
      input && code_data.append("input", input);
      axios
        .post("http://localhost:8000/api/compile", code_data)
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          setCompiledResult(
            res.data.Result ? res.data.Result : res.data.Errors
          );
          setReadOnly(true);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const checkEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      compile(compiled_result.split(": ")[1].trim());
    }
  };

  const addTab = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setCode(code + "    ");
    }
  };

  const downloadFile = () => {
    const file = new Blob([code], { type: "text/plain;charset=utf-8" });
    saveAs(file, "my_python_code.py");
  };

  // const ChatsList = ({ onChatClick }) => {
  //   useEffect(() => {
  //     axios
  //       .get("http://127.0.0.1:8000/api/getChats")
  //       .then((response) => setChats(response.data))
  //       .catch((error) => console.log(error));
  //   }, []);

  //   return (
  //     <div>
  //       <h2>Chats</h2>
  //       {chats.map((chat) => (
  //         <div
  //           key={chat.id}
  //           className="chat-card"
  //           onClick={() =>
  //             onChatClick(chat.id, chat.user.profile_picture, chat.user.name)
  //           }
  //         >
  //           <img src={chat.user.profile_picture} alt="User" />
  //           <h2>
  //             {chat.user.name.charAt(0).toUpperCase() + chat.user.name.slice(1)}
  //           </h2>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  // const Conv = ({ chat_id }) => {
  //   useEffect(() => {
  //     axios
  //       .get(`http://127.0.0.1:8000/api/getSingleChat/${chat_id}`)
  //       .then((response) => setChatData(response.data))
  //       .catch((error) => console.log(error));
  //   }, []);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8000/api/getReceiver")
  //       .then((response) => setReceiver(response.data))
  //       .catch((error) => console.log(error));
  //   }, []);

  //   return (
  //     <>
  //       <div>
  //         <div key={receiver.id} className="chat-head">
  //           <button type="button" onClick={() => setActiveChat(null)}>
  //             {"\u2190"}
  //           </button>
  //           <img src={receiver.profile_picture} alt="user" />
  //           <h2>{receiver.name}</h2>
  //         </div>
  //       </div>
  //       <div className="chat-head"></div>
  //       <div className="chat-container">
  //         <div>
  //           {chatData.map((message) => (
  //             <div key={message.id}>
  //               <h4>{message.content}</h4>
  //             </div>
  //           ))}
  //         </div>
  //         <div>
  //           <form>
  //             <input
  //               className="message-input"
  //               type="text"
  //               placeholder="Type a message..."
  //               value={messageContent}
  //               onChange={(e) => handleInputChange(e)}
  //               onKeyDown={(e) => handleKeyDown(e)}
  //             />
  //           </form>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <div>
      <div className="header">
        <h1>CODING</h1>
        {signed_in ? (
          <img src={user_photo} className="user-photo" />
        ) : (
          <span>Sign In</span>
        )}
      </div>
      <div className="editor-container">
        <div className="side-bar">
          <img
            src={search_pic}
            className="menu-button bright"
            onClick={() => openSideBar("search")}
          />
          <img
            src={files_pic}
            className="menu-button bright"
            onClick={() => openSideBar("files")}
          />
          <img
            src={messages_pic}
            className="menu-button"
            onClick={() => openSideBar("messages")}
          />
        </div>
        <div className={sidebar_open ? "sidebar-open" : "sidebar-closed"}>
          {sidebar_selected == "search" && (
            <div>
              <input
                className="search-bar"
                value={search_val}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search"
              />
              {search_res &&
                search_res.map((user) => <UserCard name={user.name} />)}
            </div>
          )}
          {sidebar_selected == "files" && (
            <div>
              {user_files ? (
                user_files.map((file) => (
                  <FileCard
                    name={file.name}
                    id={file.id}
                    content={file.content}
                    openFile={() => openFile(file.id, file.content)}
                  />
                ))
              ) : (
                <span>No files to show</span>
              )}
            </div>
          )}
          {sidebar_selected == "messages" && (
            <div>
              {/* {activeChat ? <Conv chat_id={activeChat} /> : <ChatsList />} */}
              {<ChatsList />}
            </div>
          )}
        </div>
        <div className="editor">
          <textarea
            className="editor-input"
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => addTab(e)}
          />
        </div>
        <div className={console_open ? "console-open" : "console"}>
          <div className="button-container">
            {loading ? (
              <button type="button">
                <img src={loading_pic} />
              </button>
            ) : (
              <button type="button" onClick={() => compile()}>
                Run
              </button>
            )}
            <button type="button" onClick={handleSaveClick}>
              Save
            </button>
            <button type="button" onClick={() => downloadFile()}>
              Download
            </button>
            {!console_open && (
              <span onClick={() => setConsoleOpen(true)}> Open Console</span>
            )}
          </div>
          {console_open && (
            <span onClick={() => setConsoleOpen(false)}>Close Console >> </span>
          )}
          {console_open && (
            <textarea
              className="editor-input"
              value={compiled_result}
              onChange={(e) => setCompiledResult(e.target.value)}
              onKeyDown={(e) => checkEnter(e)}
              readOnly={is_readonly}
            ></textarea>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Save As:</h2>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
