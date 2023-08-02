import React, { useState } from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../Navbar/Navbar.css";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

interface NavbarProps {
  decodeToken?: {};
  user?: {
    firstname: string;
    lastname: string;
    role: string;
  };
}
const Navbar = ({ toogleSidebar }: any): JSX.Element => {
  const token = useSelector((state: any) => state.LoginAuthReducer.token);
  const decodeToken: NavbarProps = token ? jwtDecode(token) : {};
  const name = decodeToken.user?.firstname + " " + decodeToken.user?.lastname;
  const role = decodeToken.user?.role;

  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleSiderbar = () => {
    setOpen(!isOpen);
    toogleSidebar(isOpen);
  };
  return (
    <div>
      <Grid className="navbar">
        <AppBar className="appbar">
          <Toolbar className="toolbar-navbar">
            <MenuIcon className="menu-icon" onClick={toogleSiderbar} />
            <Grid className="navbar-name-content-center">
              <Typography className="navbar-title">Panel</Typography>
              <Typography className="navbar-name">
                <span className="loggedInRole">{role?.toUpperCase()}:</span>
                <span className="loggedInName"> {name?.toUpperCase()}</span>
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

export default Navbar;
