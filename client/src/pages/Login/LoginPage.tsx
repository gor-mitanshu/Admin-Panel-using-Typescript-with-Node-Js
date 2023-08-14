import React, { useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "context/authContext";
// import { Button } from "@mui/material";

const Login: React.FC = () => {
  // const { loginWithRedirect } = useAuth0();
  const { loginHandle }: any = useAuth();

  useEffect(() => {
    // loginWithRedirect();
    loginHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {/* <h1>Login Page</h1> */}
      {/* <Button variant="contained" onClick={() => loginWithRedirect()}> */}
      {/* Log In */}
      {/* </Button> */}
    </div>
  );
};

export default Login;
