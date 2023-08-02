import React from "react";
import {
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Zoom,
} from "@mui/material";
import { Dashboard, Logout, Person } from "@mui/icons-material";
import "../Sidebar/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "redux/Action";
import useAuth from "../../context/authContext";
import { NavLink } from "react-router-dom";

const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logoutHandle }: any = useAuth();

  const handleLogout = async () => {
    await dispatch<any>(logout());
    logoutHandle();
    navigate("/login");
  };
  return (
    <>
      <Grid className="sidebar">
        <Grid item lg={12} sm={6} xs={3}>
          <Toolbar />
          <Divider />

          <NavLink to={"/dashboard"} className={"link"}>
            <ListItem disablePadding className="sidebar-item">
              <Tooltip
                title={"Dashboard"}
                arrow
                TransitionComponent={Zoom}
                enterDelay={800}
                leaveDelay={200}
                placement="bottom"
              >
                <ListItemButton className="sidebar-listitem-btn">
                  <ListItemIcon className="sidebar-icon">
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    sx={{ whiteSpace: "nowrap" }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </NavLink>
          <Divider />

          <NavLink to={"/profile"} className={"link"}>
            <ListItem disablePadding className="sidebar-item">
              <Tooltip
                title={"Profile"}
                arrow
                TransitionComponent={Zoom}
                enterDelay={800}
                leaveDelay={200}
                placement="bottom"
              >
                <ListItemButton className="sidebar-listitem-btn">
                  <ListItemIcon className="sidebar-icon">
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    sx={{ whiteSpace: "nowrap" }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </NavLink>
          <Divider />

          <ListItem disablePadding className="sidebar-item logout">
            <Tooltip
              title={"Logout"}
              arrow
              TransitionComponent={Zoom}
              enterDelay={800}
              leaveDelay={200}
              placement="bottom"
            >
              <ListItemButton
                className="sidebar-listitem-btn"
                onClick={handleLogout}
              >
                <ListItemIcon className="sidebar-icon">
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ whiteSpace: "nowrap" }} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};

export default Sidebar;
