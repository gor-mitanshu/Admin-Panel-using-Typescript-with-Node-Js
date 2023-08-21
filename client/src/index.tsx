import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";

const domainId = "dev-1x51ocfjf18nwb0k.us.auth0.com";
const clientId = "hlEvO2FIh0eJ9cnB3PpBZOw5CrjUf9Ml";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Auth0Provider
      domain={domainId}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "this is panel api",
        scope: "openid profile email",
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </Router>
);
