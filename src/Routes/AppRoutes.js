import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import AppLayout from "../Components/AppLayout";

const AppRoutes = () => {
  let routesComponent;

  const [userType, setUserType] = useState("public");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(userData, userType);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
    setLoading(false);
  }, []);

  if (userData?.id) {
    routesComponent = (
      <AppLayout
        setUserType={setUserType}
        setUserData={setUserData}
        contents={
          <PrivateRoutes userData={userData} setUserData={setUserData} />
        }
      />
    );
  } else {
    routesComponent = (
      <PublicRoutes setUserType={setUserType} setUserData={setUserData} />
    );
  }

  if (loading) {
    return null;
  }

  return <BrowserRouter>{routesComponent}</BrowserRouter>;
};

export default AppRoutes;
