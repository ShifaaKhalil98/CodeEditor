import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProfileCard from "../../components/profileCard/ProfileCard";
import File from "../../components/filediv";
import "../../../src/base.css";
import "./style.css";
const profile = () => {
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
            <File />
          </div>
        </div>
      </div>
    </div>
  );
};
export default profile;
