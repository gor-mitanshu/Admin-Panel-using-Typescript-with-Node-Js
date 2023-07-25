import React, { useState } from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../Navbar/Navbar.css";

const Navbar = ({ toogleSidebar }: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleSiderbar = () => {
    setOpen(!isOpen);
    toogleSidebar(isOpen);
  };
  return (
    <div>
      <Grid className="navbar">
        <AppBar>
          <Toolbar className="toolbar-navbar">
            <MenuIcon className="menu-icon" onClick={toogleSiderbar} />
            <Typography className="navbar-title">Admin Panel</Typography>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

export default Navbar;
