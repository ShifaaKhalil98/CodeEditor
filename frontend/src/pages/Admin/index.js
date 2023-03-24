import React, { useState, useEffect } from "react";
import axios from "axios";
import user_image from "./kaspersky.png";
import "./Admin.css";
import search from "../../images/search.png";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="header">
        <h1>CODING</h1>
        <div>
          <img src={search} className="menu-button bright" />
        </div>
      </div>
      <div className="container">
        <div className="admin-card">
          <img src={user_image} alt="My Image" />
          <h1>name</h1>
        </div>
        <div className="user-list">
          <h2>Users Statistics</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Profile picture</th>
                <th>Number of saved files</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td> ({user.email})</td>
                  <td>{user.profile_picture}</td>
                  {/* <td>{user.name}</td> */}
                  <td>Browse</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserList;
