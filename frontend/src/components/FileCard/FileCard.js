import "./FileCard.css";
import React, { useState, useEffect } from "react";

const FileCard = ({ name, id }) => {

    const openFile = () => {

    }

    const deleteFile = () => {

    }
    
  return (
    <div className="card-container">
      <div className="details">
        <h2>{name}</h2>
        <button onClick={openFile(id)}>Open</button>
        <button onClick={deleteFile(id)}>Delete</button>
      </div>
    </div>
  );
};

export default FileCard;
