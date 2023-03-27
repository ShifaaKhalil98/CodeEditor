import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Login from "../../components/Login";
import Register from "../../components/Register";
import login_regiter from  "../../images/login_regiter.png";

export default function Login_Register(){
    return(
        <div className="flex">
            <Register/>    
          <img className="background_image" src={login_regiter}/>
            
        </div>
    );
    
 }
 