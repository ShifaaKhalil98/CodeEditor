import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar_landing.css";
const token = localStorage.getItem("token");

const Navbar = () => {
  let nav = useNavigate();
  const openeditor = () => {
    nav("/editor");
  };
  return (
    <div className="navbar">
      <nav>
        <div className="main-name">
          <h1>PyScribe</h1>
        </div>
        <div className="links">
          <ul>
            <li className="">
              <Link to="/login">Sign in </Link>
            </li>
            <li className="">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="">
              <Link to="/contactUs">Contact Us</Link>
            </li>
          </ul>
          <button className="btn-tryeditor" onClick={(e) => openeditor(e)}>
            Try Editor
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
