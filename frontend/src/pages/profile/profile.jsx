import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProfileCard from "../../components/profileCard/ProfileCard";
import File from "../../components/filediv";
import "../../../src/base.css";
import "./style.css";
const Profile = () => {
  const [name, setName] = useState("");
  const [pic, sePic] = useState(pic);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get("/api/getfiles");
        setFiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getFiles();
  }, []);
  const handleFileOpen = (fileName) => {
    setSelectedFile(fileName);
  };
  const handleFileDelete = (fileName) => {
    axios
      .delete(`/api/files/${fileName}`)
      .then(() => {
        axios.get("/api/getfiles").then((response) => {
          setFiles(response.data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // didndt text the data

  return (
    <div>
      <div className="nav-main">
        <Navbar />
      </div>
      <div className="main flex jc-center ai-cneter ">
        <div className="profile-main flex ai-fs jc-center">
          <ProfileCard name={"ayman"} pic={"../../images/profile_pic.png"} />
        </div>
        <div className="files-main flex fd-column">
          <div className="file-container">
            <File
              fileName={"1"}
              openeditor={() => handleFileOpen}
              deleteFile={() => handleFileDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
// axios(map to file name and id(for delete) and also a query to get username);
// base64
// const getName = async () => {
//   axios.get('http://127.0.0.1:8000/api/display_user$')
// };
