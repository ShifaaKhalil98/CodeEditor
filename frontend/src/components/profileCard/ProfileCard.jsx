import React, { useState, useEffect } from "react";
import axios from "axios";
import profile_pic from "../../images/profile_pic.png";
import "./index.css";
const ProfileCard = ({ name, pic = null }) => {
  return (
    <div className="profile-card ">
      <div className="image">
        <img className="img" src={pic ? pic : profile_pic} />
      </div>
      <div className="name">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default ProfileCard;
