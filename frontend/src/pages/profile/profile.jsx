import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import ProfileCard from "../../components/profileCard/ProfileCard";
import File from "../../components/filediv";
import "../../../src/base.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Editor from "../Editor/Editor";

const Profile = () => {
  const baseUrl = "http://localhost:8000";
  const navigate = useNavigate;
  const [name, setName] = useState("");
  const [fileName, setfileName] = useState(null);
  const [files, setFiles] = useState([]);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedPic = localStorage.getItem("pic");
    if (storedName) setName(storedName);
    if (storedPic) setImageData(storedPic);
  }, []);

  useEffect(() => {
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
            setFiles(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getFiles();
  }, []);

  const handleFileOpen = (fileName) => {
    navigate.push(`../Editor/Editor/${fileName}`);
  };

  const handleFileDelete = (fileName) => {
    axios
      .delete(`${baseUrl}/api/files/${fileName}`)
      .then(() => {
        axios.get(`${baseUrl}/api/getfiles`).then((response) => {
          setFiles(response.data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // didndt test the reponse data

  return (
    <div>
      <div className="nav-main">
        <Navbar />
      </div>
      <div className="main flex jc-center ai-cneter ">
        <div className="profile-main fd-column flex ai-fs jc-center">
          <ProfileCard name={"ayman"} pic={imageData} />
          <div>
            <input type="file" onChange={handleImageChange} />
          </div>
        </div>
        <div className="files-main flex fd-column">
          <div className="file-container">
            {files.map((file) => {
              <File
                key={file.id}
                fileName={file.name}
                openeditor={() => handleFileOpen(fileName)}
                deleteFile={() => handleFileDelete(fileName)}
              />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
