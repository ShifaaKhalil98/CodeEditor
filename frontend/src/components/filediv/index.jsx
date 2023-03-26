import React from "react";
import styles from ".";
import "./filediv.css";
const File = () => {
  return (
    <div className="file-div flex jc-sb">
      <div className="name">
        <h2>file1</h2>
      </div>
      <div className="btns flex fd-column ">
        <button>Open</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default File;
