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
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedPic = localStorage.getItem("pic");
    if (storedName) setName(storedName);
    if (storedPic) setImageData(storedPic);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
      axios
        .post(`${baseUrl}/api/uploadImage`, { imageData: reader.result })
        .then((response) => {
          setImageData(response.data.image_url);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/getfiles`);
        setFiles(response.data);
      } catch (error) {
        console.error(error);
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
        <div className="profile-main flex ai-fs jc-center">
          <ProfileCard name={"ayman"} pic={imageData} />
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="files-main flex fd-column">
          <div className="file-container">
            {files.map((file) => {
              <File
                key={file.id}
                fileName={file.name}
                openeditor={() => handleFileOpen(file.id)}
                deleteFile={() => handleFileDelete(file.id)}
              />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
