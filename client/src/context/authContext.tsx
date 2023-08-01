import React, { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  authed: boolean;
  loginHandle: () => void;
  logoutHandle: () => void;
}

const authContext = createContext<AuthContextType | null>(null);

function useAuth(): AuthContextType {
  const [authed, setAuthed] = useState(false);

  const loginHandle = () => {
    return new Promise<void>(() => {
      setAuthed(true);
    });
  };

  const logoutHandle = () => {
    return new Promise<void>(() => {
      setAuthed(false);
    });
  };

  return {
    authed,
    loginHandle,
    logoutHandle,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function AuthConsumer() {
  return useContext(authContext);
}

export default AuthConsumer;
