import React, { useEffect, useState } from "react";
import "../Dashboard/DashboardPage.css";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { BarChartMonth, PieChart } from "./Chart/Chart";
import axios from "axios";

const Dashboard = (): JSX.Element => {
  const [monthData, setMonthData] = useState(null);
  const [previousMonthData, setPreviousMonthData] = useState(null);

  useEffect(() => {
    // Fetch data for the current month (August)
    axios.get("http://localhost:7474/monthdata").then((response) => {
      const data = response.data[0];
      setMonthData(data.August);
    });

    // Fetch data for the previous month (July)
    axios.get("http://localhost:7474/monthdata").then((response) => {
      const data = response.data[0];
      setPreviousMonthData(data.July);
    });
  }, []);

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

        {monthData && previousMonthData && (
          <>
            <Grid item lg={6} xs={12}>
              <BarChartMonth data={previousMonthData} title="July" />
            </Grid>
            <Grid item lg={6} xs={12}>
              <BarChartMonth data={monthData} title="August" />
            </Grid>
            <Grid item lg={6} xs={12}>
              <PieChart data={monthData} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
