import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
const ProfileCard = ({ pic = null }) => {
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
            {user.profile_picture ? (
              <img className="img" src={user.profile_picture} alt="User" />
            ) : (
              <img className="img" src={pic} alt="User" />
            )}
          </div>
          <div className="name">
            <h2>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
