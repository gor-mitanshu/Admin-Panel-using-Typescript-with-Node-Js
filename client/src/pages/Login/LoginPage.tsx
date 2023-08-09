import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  //   useEffect(() => {
  //   loginWithRedirect();
  // }, []);
  return (
    <div>
      <h1>Login Page</h1>
      <Button variant="contained" onClick={() => loginWithRedirect()}>
        Log In
      </Button>
    </div>
  );
};

export default Login;
