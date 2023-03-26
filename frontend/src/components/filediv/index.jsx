import React from "react";
import styles from ".";
import "./filediv.css";
const File = ({ fileName }) => {
  // function delete(axios)
  // function open(go another route)

  return (
    <div className="file-div flex jc-sb">
      <div className="name">
        <h2>{fileName}</h2>
      </div>
      <div className="btns flex ai-center ">
        <button>Open</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default File;
