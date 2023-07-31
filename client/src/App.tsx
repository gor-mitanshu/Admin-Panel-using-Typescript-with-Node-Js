import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "pages/Login/LoginPage";
import Layout from "components/Layout/Layout";
import Dashboard from "pages/Dashboard/Dashboard";
import { AuthProvider } from "context/authContext";
import ProtectedRoute from "protectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { logout } from "redux/Action";
import { persistor } from "redux/Store";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.LoginAuthReducer.token);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (!!token) {
        const decodeToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodeToken.exp < currentTime) {
          dispatch<any>(logout());
          persistor.purge(); // Clear the Redux-persist store
        }
      }
    };
    checkTokenValidity();
    // Add an interval to check token validity every minute
    const tokenCheckInterval = setInterval(checkTokenValidity, 60000);
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, [token, dispatch]);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
