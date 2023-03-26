import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const signout = () => {
    axios
      .post("http://localhost:8000/api/logout")
      .then((res) => {
        navigate.push("../../pages/Editor");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="header">
      <h1>CODING</h1>
      <span onClick={signout}>Sign out</span>
    </div>
  );
};

export default Navbar;
