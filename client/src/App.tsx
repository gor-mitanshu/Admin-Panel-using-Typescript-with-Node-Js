import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "pages/Login/LoginPage";
import Layout from "components/Layout/Layout";
import Dashboard from "pages/Dashboard/DashboardPage";
import ProfilePage from "pages/Profile/ProfilePage/ProfilePage";
import ProfileUpdatePage from "pages/Profile/ProfileUpdatePage/ProfileUpdatePage";
import { AuthProvider } from "context/authContext";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { error } = useAuth0();
  console.log(error);
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/profile/updateprofile/:sub"
            element={<ProfileUpdatePage />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
