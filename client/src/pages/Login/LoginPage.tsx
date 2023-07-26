import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "redux/Action";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/authContext";

const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: any) => event.preventDefault();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginHandle }: any = useAuth();

  const showErrorWithTimeout = (errorMessage: string, timeout: number) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, timeout);
  };
  useEffect(() => {
    setError(null);
  }, [email, password]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!email && !password) {
      showErrorWithTimeout("Please Enter both Email and Password", 4000);
      return;
    }
    if (!email) {
      showErrorWithTimeout("Please Enter a Valid Email", 4000);
      return;
    }
    if (!password) {
      showErrorWithTimeout("Please Enter a Valid Password", 4000);
      return;
    }
    try {
      const response = await dispatch<any>(
        login({ email: email, password: password })
      );
      if (!!response && response.data.success === true) {
        loginHandle();
        navigate("/");
      }
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.log(error);
      showErrorWithTimeout(error.response.data.message, 4000);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1">
            Login
          </Typography>
          {error && (
            <Typography color="error" fontWeight={700}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              autoComplete="action"
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
