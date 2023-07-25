import React, { useState } from "react";
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

const LoginPage = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: any) => event.preventDefault();
  const dispatch = useDispatch();

  const showErrorWithTimeout = (errorMessage: string, timeout: number) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, timeout);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!email && !password) {
      showErrorWithTimeout("Please Enter both Email and Password", 3000);
    }
    if (!email) {
      showErrorWithTimeout("Please Enter a Valid Email", 3000);
    }
    if (!password) {
      showErrorWithTimeout("Please Enter a Valid Password", 3000);
    }
    dispatch<any>(login({ email: email, password: password }));
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1">
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
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
