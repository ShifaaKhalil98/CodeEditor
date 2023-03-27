import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Login from "../../components/Login";
import Register from "../../components/Register";
import login_regiter from  "../../images/login_regiter.png";

export default function Login_Register(){
  const [ShowLogin,setShowLogin]=useState(true);
  const togle_component=()=>{
    setShowLogin(!ShowLogin);

  }
    return(
        <div className="flex">
          {ShowLogin?<Login togle_component={togle_component}/>:<Register togle_component={togle_component}/> }
      
          <img className="background_image" src={login_regiter}/>
            
        </div>
    );
    
 }
 