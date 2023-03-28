import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import ProfileCard from "../../components/profileCard/ProfileCard";
import File from "../../components/filediv";
import "../../../src/base.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Editor from "../Editor/Editor";

const token = localStorage.getItem("token");

function ProfilePictureUpload() {
  const baseUrl = "http://localhost:8000";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [fileName, setfileName] = useState(null);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedPic = localStorage.getItem("pic");
    if (storedName) setName(storedName);
    if (storedPic) setFile(storedPic);
  }, []);

  useEffect(() => {
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
            setFiles(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getFiles();
  }, []);

  const handleFileDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/deletefile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        axios
          .get(`${baseUrl}/api/getfiles`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setFiles(response.data);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditorNavigate = () => {
    navigate("/editor");
  };

  const handleFileOpen = (fileName) => {
    navigate.push(`../Editor/Editor/${fileName}`);
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="nav-main">
        <Navbar />
      </div>
      <div className="main flex jc-center ai-cneter ">
        <div className="profile-main">
          <button className="back-button" onClick={handleEditorNavigate}>
            {"\u2190"} back to editor
          </button>
          <ProfileCard name={name} pic={file} />
          <div className="input-container">
            <h3>Update Profile Pic</h3>
            <input type="file" onChange={handleFileInputChange} />
            <button onClick={handleUploadClick}>Upload</button>
          </div>
        </div>
        <div className="files-main ">
          <div className="file-container">
            {files.map((file) => (
              <File
                key={file.id}
                fileName={file.name}
                openeditor={() => handleFileOpen(fileName)}
                deleteFile={() => handleFileDelete(file.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePictureUpload;
