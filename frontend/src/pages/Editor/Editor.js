import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
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
  const [is_readonly, setReadOnly] = useState(true);
  const [filename, setFilename] = useState("");
  const [user_files, setUserFiles] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    getFiles();
    
    if(token) {
      refresh()
      console.log('called')
    }
  }, []);

  useEffect(() => {
    if(sidebar_selected == 'files') {
      getFiles()
    }
  }, [sidebar_selected])

  const refresh = () => {
    axios
      .post("http://localhost:8000/api/refresh", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res)
        setToken(res.data.authorisation.token)
        localStorage.setItem('token', res.data.authorisation.token)
        setSignedIn(true)
        setUserPhoto(res.data.user.profile_picture)
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleSave = () => {
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

  const deleteFile = (id) => {
    axios
        .delete(`http://localhost:8000/api/deletefile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          getFiles()
        })
        .catch((err) => {
          console.log(err);
        });
  };

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

  return (
    <div>
      <div className="header">
        <h1>CODING</h1>
        {signed_in ? (
          <img src={user_photo} className="user-photo" />
        ) : (
          <span onClick={() => navigate('/Login_Register')}>Sign In</span>
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
                    deleteFile={() => deleteFile(file.id)}
                  />
                ))
              ) : (
                <span>No files to show</span>
              )}
            </div>
          )}
          {sidebar_selected == "messages" && <div>{<ChatsList />}</div>}
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
