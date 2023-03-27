import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Login from "../../components/Login";
import Register from "../../components/Register";

export default function Login_Register(){
  const [ShowLogin,setShowLogin]=useState(true);
  const togle_component=()=>{
    setShowLogin(!ShowLogin);

  }
    return(
        <div >
          {ShowLogin?<Login togle_component={togle_component}/>:<Register togle_component={togle_component}/> }
      
          
            
        </div>
    );
    
 }
 