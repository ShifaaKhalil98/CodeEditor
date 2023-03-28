import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
const token = localStorage.getItem("token");
console.log(token);
const Navbar = () => {
  const navigate = useNavigate();
  const signout = () => {
    localStorage.clear();
    navigate("/login_register");
  };

  return (
    <div className="header">
      <h1>PyScribe</h1>
      <span onClick={signout}>Sign out</span>
    </div>
  );
};

export default Navbar;
