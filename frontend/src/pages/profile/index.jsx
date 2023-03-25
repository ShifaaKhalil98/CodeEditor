import React, { useState, useEffect } from "react";
import axios from "axios";

import ProfileCard from "../../components/profileCard/ProfileCard";

const profile = () => {
  return (
    <div>
      <ProfileCard name={"ayman"} pic={"../../images/profile-pic.png"} />
    </div>
  );
};
export default profile;
