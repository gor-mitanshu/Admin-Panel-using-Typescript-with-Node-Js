import React, { useState } from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../Navbar/Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ toogleSidebar }: any): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleSiderbar = () => {
    setOpen(!isOpen);
    toogleSidebar(isOpen);
  };

  const { user } = useAuth0();
  return (
    <div>
      <Grid className="navbar">
        <AppBar className="appbar">
          <Toolbar className="toolbar-navbar">
            <MenuIcon className="menu-icon" onClick={toogleSiderbar} />
            <Grid className="navbar-name-content-center">
              <Typography className="navbar-title">Panel</Typography>
              {user ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography className="navbar-name">
                      <span className="loggedInName">
                        {user?.family_name?.toUpperCase() +
                          " " +
                          user?.given_name?.toUpperCase()}
                      </span>
                    </Typography>
                  </div>
                </>
              ) : null}
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

export default Navbar;
