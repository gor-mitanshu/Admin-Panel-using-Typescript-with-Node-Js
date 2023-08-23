import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";

const domainID: any = process.env.REACT_APP_AUTH0_MANAGEMENT_DOMAIN;
const clientID: any = process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_ID;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Auth0Provider
      domain={domainID}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_MANAGEMENT_AUDIENCE,
        scope: process.env.REACT_APP_AUTH0_MANAGEMENT_SCOPE,
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
