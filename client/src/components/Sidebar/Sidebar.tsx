import React from "react";
import {
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Dashboard, Logout } from "@mui/icons-material";
import "../Sidebar/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "redux/Action";

const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Out = () => {
    navigate("/login");
    dispatch<any>(logout());
  };
  return (
    <>
      <Grid className="sidebar">
        <Grid item lg={12} sm={6} xs={3}>
          <Toolbar />
          <Divider />
          <ListItem disablePadding className="sidebar-item">
            <ListItemButton className="sidebar-listitem-active-btn">
              <ListItemIcon className="sidebar-icon">
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ whiteSpace: "nowrap" }} />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disablePadding className="sidebar-item logout">
            <ListItemButton
              className="sidebar-listitem-active-btn"
              onClick={Out}
            >
              <ListItemIcon className="sidebar-icon">
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ whiteSpace: "nowrap" }} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};

export default Sidebar;
