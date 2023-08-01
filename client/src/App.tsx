import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "context/authContext";
import ProtectedRoute from "protectedRoute/ProtectedRoute";
import LoginPage from "pages/Login/LoginPage";
import Layout from "components/Layout/Layout";
import Dashboard from "pages/Dashboard/DashboardPage";
import ProfilePage from "pages/Profile/ProfilePage/ProfilePage";
import ProfileUpdatePage from "pages/Profile/ProfileUpdatePage/ProfileUpdatePage";

function App() {
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
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/updateprofile/:id"
                element={
                  <ProtectedRoute>
                    <ProfileUpdatePage />
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
