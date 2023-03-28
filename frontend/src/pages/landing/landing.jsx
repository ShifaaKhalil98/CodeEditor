import "./landing.css";
import React from "react";
import logo from "../../images/logo.png";
import Navbar_landing from "../../components/Navbar_landing/Navbar_landing";
import Footer from "../../components/footer/footer";
import { Link, useNavigate } from "react-router-dom";
const Landing = () => {
  let nav = useNavigate();
  const openeditor = () => {
    nav("/editor");
  };
  return (
    <div>
      <Navbar_landing />
      <div className="section1">
        <div className="main-landing">
          <p className="writeRunDebug">Write, Run, Debug</p>
          <div className="letsCode">
            <p className="printLetsCode">print(“let’s code”)</p>
          </div>
        </div>
        <img alt="" className="logo" src={logo} />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
