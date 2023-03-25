import "./UserCard.css";
import React, { useState, useEffect } from "react";
import profile_pic from '../../images/profile-pic.png'
import bubble from '../../images/bubble.png'

const UserCard = ({ name, pic=null }) => {
  const [fullName, setfullName] = useState(name);
  const [profilePic, setProfilePic] = useState(pic);

  return (
    <div className="card-container">
        <div className="details">
            <img src={profilePic ? profilePic :profile_pic}/>
            <h2>{fullName}</h2>
            <img className="msg" src={bubble}/>
        </div>
    </div>
  );
};

export default UserCard;
