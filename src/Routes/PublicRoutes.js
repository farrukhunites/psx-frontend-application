import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Public/Login/index";
import Signup from "../Pages/Public/Signup/index";
import ForgotPassword from "../Pages/Public/ForgotPassword";

const PublicRoutes = ({ setUserType, setUserData }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login setUserType={setUserType} setUserData={setUserData} />}
      />
      <Route path="/signup" element={<Signup setUserType={setUserType} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="*"
        element={<Login setUserType={setUserType} setUserData={setUserData} />}
      />
    </Routes>
  );
};

export default PublicRoutes;
