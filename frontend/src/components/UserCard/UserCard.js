import "./UserCard.css";
import React, { useState, useEffect } from "react";
import profile_pic from "../../images/profile_pic.png";
import bubble from "../../images/bubble.png";

const UserCard = ({ name, pic = null, messageHandle }) => {
  return (
    <div className="card-container">
      <div className="details">
        <img src={pic ? pic : profile_pic} />
        <h2>{name}</h2>
        <img className="msg" src={bubble} onClick={messageHandle} />
      </div>
    </div>
  );
};

export default UserCard;
