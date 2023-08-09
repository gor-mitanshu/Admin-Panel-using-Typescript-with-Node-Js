import React, { createContext, useContext, useEffect, useState } from "react";
import {
  // Auth0Provider,
  useAuth0,
} from "@auth0/auth0-react";

interface AuthContextType {
  authed: boolean;
  loginHandle: () => void;
  logoutHandle: () => void;
}

const authContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [authed, setAuthed] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const loginHandle = () => {
    loginWithRedirect();
  };

  const logoutHandle = () => {
    // logout({ returnTo: window.location.origin });
    logout();
  };

  useEffect(() => {
    if (isAuthenticated) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, [isAuthenticated]);

  return (
    <authContext.Provider value={{ authed, loginHandle, logoutHandle }}>
      {children}
    </authContext.Provider>
  );
};

export function useAuth() {
  return useContext(authContext);
}
