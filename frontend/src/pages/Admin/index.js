import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import Navbar from "../../components/navbar";

function UserList() {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getAdmin")
      .then((response) => setAdmin(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="nav-main">
        <Navbar />
      </div>
      <div className="container">
        <div className="admin-card">
          {admin.map((ad) => (
            <div key={ad.id}>
              <img src={ad.profile_picture} alt="Admin" />
              <h2>{ad.name.charAt(0).toUpperCase() + ad.name.slice(1)}</h2>
            </div>
          ))}
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
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td> {user.email}</td>
                  <td>{user.profile_picture}</td>
                  <td>{user.files_count}</td>
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
