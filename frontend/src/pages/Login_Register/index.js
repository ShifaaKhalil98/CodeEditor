import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Login from "../../components/Login";
import Register from "../../components/Register";
export default function Login_Register(){
    return(
        <div className="flex">
            <Login/>
           
           <Register/>
            
        </div>
    );
    
 }
 