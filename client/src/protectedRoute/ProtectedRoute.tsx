import React, { useEffect } from "react";
import useAuth from "../context/authContext";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { logout } from "redux/Action";
import { persistor } from "redux/Store";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }: any) => {
  const { authed }: any = useAuth();
  const { location }: any = useLocation();
  // const checkToken = localStorage.getItem("auth");
  const checkedToken = useSelector(
    (state: any) => state.LoginAuthReducer.token
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API}/api/protectedRoute`, {
          headers: {
            Authorization: `Bearer ${checkedToken}`,
          },
        });
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          dispatch<any>(logout());
          persistor.purge();
        }
      }
    };

    checkTokenValidity();
    const tokenCheckInterval = setInterval(checkTokenValidity, 60000);
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, [dispatch, checkedToken]);

  return (
    <>
      {authed === true || checkedToken ? (
        children
      ) : (
        <Navigate to={"/login"} replace state={location?.pathname} />
      )}
    </>
  );
};

export default ProtectedRoute;
