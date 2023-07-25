import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Layout from "components/Layout/Layout";
import LoginPage from "pages/Login/LoginPage";

function App() {
  return (
    <>
      {/* <Layout /> */}
      {/* <LoginPage /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
