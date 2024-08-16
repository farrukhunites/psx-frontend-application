import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Public/Login/index";
import Signup from "../Pages/Public/Signup/index";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default PublicRoutes;
