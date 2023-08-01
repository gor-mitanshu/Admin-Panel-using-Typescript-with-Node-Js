import React from "react";
import useAuth from "../context/authContext";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: any) => {
  const { authed }: any = useAuth();
  const { location }: any = useLocation();
  const accessToken = useSelector((state: any) => state.LoginAuthReducer.token);

  return (
    <>
      {authed === true || accessToken ? (
        children
      ) : (
        <Navigate to={"/login"} replace state={location?.pathname} />
      )}
    </>
  );
};

export default ProtectedRoute;
