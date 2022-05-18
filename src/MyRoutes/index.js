import React from "react";
import Home from "./../Components/Home";
import Login from "../Components/Login";
import { Routes, Route } from "react-router-dom";

function index() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/:userID" element={<Home />} />
    </Routes>
  );
}

export default index;
