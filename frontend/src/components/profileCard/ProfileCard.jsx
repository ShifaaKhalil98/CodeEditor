// import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../src/base.css";
import profile_pic from "../../images/profile_pic.png";

const ProfileCard = ({ name, pic = null }) => {
  // const [fullName, setfullName] = useState(name);
  // const [profilePic, setProfilePic] = useState(pic);

  return (
    <div className="profile-card flex fd-column jc-center ">
      <div className="image">
        <img src={pic ? pic : profile_pic} />
      </div>
      <div className="name">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default ProfileCard;
