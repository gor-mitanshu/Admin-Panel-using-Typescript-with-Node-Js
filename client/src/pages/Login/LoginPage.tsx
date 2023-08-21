import React, { useEffect } from "react";
import { useAuth } from "context/authContext";

const Login: React.FC = () => {
  const { loginHandle }: any = useAuth();

  useEffect(() => {
    loginHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div></div>;
};

export default Login;
