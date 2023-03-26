import React, { useEffect, useState } from "react";
import styles from ".";
import "./filediv.css";
import axios from "axios";
const File = ({ fileName, openeditor, deleteFile }) => {
  return (
    <div className="file-div flex jc-sb">
      <div className="name">
        <h2>{fileName}</h2>
      </div>
      <div className="btns flex ai-center ">
        <button onClick={() => openeditor(fileName)}>Open</button>
        <button onClick={() => deleteFile(fileName)}>Delete</button>
      </div>
    </div>
  );
};

export default File;
// function delete(axios)
// function open(go another route)
//   const openeditor=()=>{
//     axios.
//   }
// const deleteFile=()=>{
//     axios.
//   }
