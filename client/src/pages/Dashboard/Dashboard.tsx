import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const Dashboard = (): JSX.Element => {
  // console.log(localStorage.getItem("auth"));
  return (
    <>
      {/* <Typography variant="h3" padding={2}>
        Dashboard
      </Typography> */}
      <Grid container padding={2} spacing={1}>
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <Card
            sx={{
              backgroundImage:
                "url(https://img.freepik.com/premium-vector/abstract-bubbles-black-background_336924-3490.jpg)",
              color: "#fff",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            />
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
          <Card
            sx={{
              backgroundImage:
                "url(https://img.freepik.com/premium-photo/bubbles-orange-water-3d-render_85770-45.jpg)",
              color: "#fff",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            />
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
          <Card
            sx={{
              backgroundImage:
                "url(https://img.freepik.com/premium-vector/shiny-abstract-bubbles-decorated-green-background-copyspace_1302-19158.jpg?w=2000)",
              color: "#fff",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            />
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
          <Card
            sx={{
              backgroundImage:
                "url(https://img.freepik.com/premium-photo/soap-bubbles-red-background-red-abstract-background_3248-503.jpg?w=2000)",
              color: "#fff",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            />
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
      </Grid>
    </>
  );
};

export default Dashboard;
