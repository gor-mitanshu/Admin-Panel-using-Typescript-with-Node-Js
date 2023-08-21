import React, { useEffect } from "react";
import "../Dashboard/DashboardPage.css";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { CurretWeekChart, LastWeekChart, PieChart } from "./Chart/Chart";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Loader from "loader/Loader";

const Dashboard = (): JSX.Element => {
  const { user, isLoading }: any = useAuth0();
  const addUser = async () => {
    const body = {
      email: user?.email,
      email_verified: user?.email_verified,
      family_name: user?.family_name,
      given_name: user?.given_name,
      name: user?.name,
      nickname: user?.nickname,
      picture: user?.picture,
      sub: user?.sub,
      password: user?.password,
      updated_at: user?.updated_at,
    };
    await axios.post(`${process.env.REACT_APP_API}/register`, body);
  };
  useEffect(() => {
    if (user) {
      addUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    <Loader />;
  }

  return (
    <>
      <Grid container padding={2} spacing={1}>
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <Card className="card card-1">
            <Box className="card-box" />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ fontSize: "2rem", position: "relative", zIndex: 1 }}
                >
                  Card 1
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#fff"
                  component="div"
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  Lorem ipsum dolor sit
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <Card className="card card-2">
            <Box className="card-box" />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ fontSize: "2rem", position: "relative", zIndex: 1 }}
                >
                  Card 2
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#fff"
                  component="div"
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  Lorem ipsum dolor sit
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <Card className="card card-3">
            <Box className="card-box" />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ fontSize: "2rem", position: "relative", zIndex: 1 }}
                >
                  Card 3
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#fff"
                  component="div"
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  Lorem ipsum dolor sit
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <Card className="card card-4">
            <Box className="card-box" />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ fontSize: "2rem", position: "relative", zIndex: 1 }}
                >
                  Card 4
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#fff"
                  component="div"
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  Lorem ipsum dolor sit
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>

        <Grid item lg={6} xs={12}>
          <CurretWeekChart />
        </Grid>
        <Grid item lg={6} xs={12}>
          <LastWeekChart />
        </Grid>
        <Grid item lg={6} xs={12}>
          <PieChart />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
