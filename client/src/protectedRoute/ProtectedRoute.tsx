import React from "react";
import useAuth from "../context/authContext";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: any) => {
  const { authed }: any = useAuth();
  const { location }: any = useLocation();
  // const checkToken = localStorage.getItem("auth");
  const checkToken = useSelector((state: any) => state.LoginAuthReducer.token);
  // console.log(
  //   useSelector((state: any) => state.LoginAuthReducer),
  //   "LOginAUthReducer"
  // );
  // console.log(
  //   useSelector((state: any) => state.LoginAuthReducer.token),
  //   "Token"
  // );

  return (
    <>
      {authed === true ? (
        children
      ) : checkToken ? (
        children
      ) : (
        <Navigate to={"/login"} replace state={location?.pathname} />
      )}
    </>
  );
};

export default ProtectedRoute;
