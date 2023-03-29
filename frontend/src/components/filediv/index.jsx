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
        <button onClick={() => deleteFile(fileName)}>Delete</button>
      </div>
    </div>
  );
};

export default File;
