import React, {
  useState,
  //  useEffect
} from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../Navbar/Navbar.css";
// import { useSelector } from "react-redux";
// import jwtDecode from "jwt-decode";
// import { isAxiosError } from "axios";
// import { AuthActionTypes } from "redux/types/authTypes";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { RootState } from "redux/combineReducer";
// import api from "utils/api";
import { useAuth0 } from "@auth0/auth0-react";

// interface NavbarProps {
//   decodeToken?: {};
//   firstname: string;
//   lastname: string;
//   role: string;
// }
const Navbar = ({ toogleSidebar }: any): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleSiderbar = () => {
    setOpen(!isOpen);
    toogleSidebar(isOpen);
  };

  // const token = useSelector((state: any) => state.LoginAuthReducer.token);
  // const decodeToken: NavbarProps = token ? jwtDecode(token) : {};
  // const name = decodeToken.user?.firstname + " " + decodeToken.user?.lastname;
  // const role = decodeToken.user?.role;

  // const token = useSelector((state: RootState) => state.LoginAuthReducer.token);
  // const [profile, setProfile] = useState<NavbarProps>();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       if (!token) {
  //         throw new Error("Token Not Found");
  //       }
  //       const response = await api.get(
  //         `${process.env.REACT_APP_API}/api/getuser`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (response.data.success === true && response.status === 200) {
  //         setProfile(response.data.user);
  //       }
  //       // else {
  //       //   console.log("Error Fetching Data");
  //       // }
  //     } catch (error) {
  //       // console.log(error);
  //       if (isAxiosError(error)) {
  //         if (error.response?.status === 401) {
  //           // console.log("UnAuthorized User Profile Page");
  //           dispatch({ type: AuthActionTypes.LOGOUT });
  //           navigate("/login");
  //         }
  //       }
  //     }
  //   };
  //   fetchUserProfile();
  // }, [dispatch, navigate, token]);

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
                    {/* <img
                      src={user?.picture}
                      alt=""
                      style={{
                        background: "white",
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                      }}
                    /> */}
                    <Typography className="navbar-name">
                      {/* <span className="loggedInRole">
                      {user?.family_name?.toUpperCase()}
                    </span> */}
                      <span className="loggedInName">
                        {" "}
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
