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
      <div className="section2">
        <div className="description">
          <p className="titlee">Code like a Pro</p>
          <p className="textt">
            PyScribe a powerful code editor
            <br /> that helps you write better code faster.
          </p>
        </div>
        <div className="description">
          <p className="titlee title2">Python Support</p>
          <p className="textt text2">
            PyScribe supports Python and <br /> provides real-time compiling and
            error reporting.
          </p>
        </div>
        <div className="description-marketing">
          <p className="titlee-why title2-why">Why Choose PyScribe?</p>

          <ul className="circles">
            <li>Debug your code in real-time with advanced debugging tools.</li>
            <li>Compile,Save and Download your code in python</li>
            <li>Chat with other devs using built in chat tool.</li>
          </ul>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
