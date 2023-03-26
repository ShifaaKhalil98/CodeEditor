import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import ProfileCard from "../../components/profileCard/ProfileCard";

const profile = () => {
  return (
    <div>
      <div className="nav-main">
        <Navbar />
      </div>
      <div>
        <ProfileCard name={"ayman"} pic={"../../images/profile_pic.png"} />
      </div>
      <div className="files-main"></div>
    </div>
  );
};
export default profile;
