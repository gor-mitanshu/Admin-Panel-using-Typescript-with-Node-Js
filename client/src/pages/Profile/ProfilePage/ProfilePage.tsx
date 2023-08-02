import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button } from "@mui/material";
import { RootState } from "redux/combineReducer";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import api from "utils/api";
import { isAxiosError } from "axios";
import { AuthActionTypes } from "redux/types/authTypes";

const Profile: React.FC = () => {
  const token = useSelector((state: RootState) => state.LoginAuthReducer.token);
  const [profile, setProfile] = useState<any | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!token) {
          throw new Error("Token Not Found");
        }
        const response = await api.get(
          `${process.env.REACT_APP_API}/api/getuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success === true && response.status === 200) {
          setProfile(response.data.user);
        }
        // else {
        //   console.log("Error Fetching Data");
        // }
      } catch (error) {
        // console.log(error);
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            // console.log("UnAuthorized User Profile Page");
            dispatch({ type: AuthActionTypes.LOGOUT });
            navigate("/login");
          }
        }
      }
    };
    fetchUserProfile();
  }, [dispatch, navigate, token]);

  return (
    <Container maxWidth="md">
      <Typography
        // variant="h4"
        // align="center"
        className="profile-title"
      >
        User Profile
      </Typography>
      {profile ? (
        <div>
          <Typography variant="body1" gutterBottom>
            <span className="label">First Name:</span>{" "}
            <span className="label-info">{profile.firstname}</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span className="label">Last Name:</span>{" "}
            <span className="label-info">{profile.lastname}</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span className="label">Email:</span>{" "}
            <span className="label-info">{profile.email}</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span className="label">Phone:</span>{" "}
            <span className="label-info">{profile.phone}</span>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "5px !important" }}
            onClick={() => navigate(`/profile/updateprofile/${profile._id}`)}
          >
            Update Profile
          </Button>
        </div>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </Container>
  );
};

export default Profile;
