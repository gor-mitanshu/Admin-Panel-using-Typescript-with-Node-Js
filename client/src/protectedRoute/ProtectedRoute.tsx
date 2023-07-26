import React from "react";
import useAuth from "../context/authContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { authed }: any = useAuth();
  const { location }: any = useLocation();

  return (
    <>
      {authed === true ? (
        children
      ) : (
        <Navigate to={"/login"} replace state={location?.pathname} />
      )}
    </>
  );
};

export default ProtectedRoute;
