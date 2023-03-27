// import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../../../src/base.css";
import profile_pic from "../../images/profile_pic.png";
import "./index.css";
const ProfileCard = ({ pic = null }) => {
  // const [fullName, setfullName] = useState(name);
  // const [profilePic, setProfilePic] = useState(pic);
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/api/displayUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUser(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className="profile-card ">
      {user && (
        <div key={user.id}>
          <div className="image">
            <img className="img" src={user.profile_picture} alt="User" />

            {/* <img className="img" src={pic ? u.profile_picture : profile_pic} /> */}
          </div>
          {/* <img src={user.profile_picture} alt="User" /> */}
          <div className="name">
            <h2>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
