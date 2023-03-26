// import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

// import profile-pic from "../../images/profile-pic.png";

const ProfileCard = ({ name, pic }) => {
  const [fullName, setfullName] = useState(name);
  const [profilePic, setProfilePic] = useState(pic);

  return (
    <div className="profile-container flex fd-column jc-center">
      <div className="image">
        <img src={profilePic} alt="pic" />
      </div>
      <div className="name">
        <h2>{fullName}</h2>
      </div>
    </div>
  );
};

export default ProfileCard;
