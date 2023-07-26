import React, { createContext, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "redux/Action";

interface AuthContextTypes {
  loggedIn: boolean;
  isAdmin: boolean;
  loginhandle: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [loggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!localStorage.getItem("auth")
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!!token) {
      setIsLoggedIn(true);
      setIsAdmin(true);
    }
  }, []);

  const loginhandle = async (email: string, password: string) => {
    try {
      const response = await dispatch<any>(login({ email, password }));
      if (!!response && response.data.success === true) {
        setIsAdmin(true);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch<any>(logout());
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, isAdmin, loginhandle, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
