import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const Dashboard = (): JSX.Element => {
  // console.log(localStorage.getItem("auth"));
  return (
    <>
      <Typography variant="h3" padding={2}>
        Dashboard
      </Typography>
      <Grid padding={2}>
        <Grid item container paddingBottom={3}>
          <Grid item lg={3} sx={{ border: "1px solid black" }}>
            <Card>
              <CardContent>
                <Typography>Card 1</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                  eligendi.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={3} sx={{ border: "1px solid black" }}>
            <Card>
              <CardContent>
                <Typography>Card 2</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                  eligendi.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={3} sx={{ border: "1px solid black" }}>
            <Card>
              <CardContent>
                <Typography>Card 3</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                  eligendi.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={3} sx={{ border: "1px solid black" }}>
            <Card>
              <CardContent>
                <Typography>Card 3</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                  eligendi.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
