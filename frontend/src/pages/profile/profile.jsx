import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
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
      const token = localStorage.getItem("token");
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
  return (
    <div>
      <div className="nav-main">
        <Navbar />
      </div>
      <div className="main flex jc-center ai-cneter ">
        <div className="profile-main">
          <ProfileCard name={"ayman"} pic={imageData} />
          <div className="input-container">
            <h3>Update Profile Pic</h3>
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
