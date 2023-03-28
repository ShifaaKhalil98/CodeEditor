import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Editor from "./pages/Editor/Editor";
import UserList from "./pages/Admin";
import Profile from "./pages/profile/profile";
import React from "react";
import Login_Register from "./pages/Login_Register/index";
import Landing from "./pages/landing/landing";
// import ReactDOM from "react-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/editor" element={<Editor />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<UserList />} />
      <Route path="/Login_Register" element={<Login_Register />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
