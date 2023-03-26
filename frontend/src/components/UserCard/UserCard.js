import "./UserCard.css";
import React, { useState, useEffect } from "react";
import profile_pic from "../../images/profile-pic.png";
import bubble from "../../images/bubble.png";

const UserCard = ({ name, pic = null }) => {
  return (
    <div className="card-container">
      <div className="details">
        <img src={pic ? pic : profile_pic} />
        <h2>{name}</h2>
        <img className="msg" src={bubble} />
      </div>
    </div>
  );
};

export default UserCard;
