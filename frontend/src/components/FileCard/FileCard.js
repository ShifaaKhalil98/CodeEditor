import "./FileCard.css";
import React, { useState, useEffect } from "react";

const FileCard = ({ name, id, content, openFile }) => {
  const deleteFile = () => {};

  return (
    <div className="filecard-container">
      <div className="file-details">
        <h2>{name}</h2>
        <div className="action-buttons">
          <button onClick={() => openFile(id, content)}>Open</button>
          <button onClick={deleteFile(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
