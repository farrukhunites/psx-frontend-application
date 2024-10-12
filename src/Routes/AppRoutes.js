import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import AppLayout from "../Components/AppLayout";

const AppRoutes = () => {
  let routesComponent;

  const [userType, setUserType] = useState("public");

  switch (userType) {
    case "user":
      routesComponent = <AppLayout contents={<PrivateRoutes />} />;
      break;
    case "public":
      routesComponent = <PublicRoutes setUserType={setUserType} />;
      break;
    default:
      routesComponent = <PublicRoutes setUserType={setUserType} />;
      break;
  }

  return <BrowserRouter>{routesComponent}</BrowserRouter>;
};

export default AppRoutes;
