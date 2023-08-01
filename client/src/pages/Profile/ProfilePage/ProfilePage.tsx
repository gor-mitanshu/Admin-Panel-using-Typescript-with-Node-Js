import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button } from "@mui/material";
import { RootState } from "redux/combineReducer";
import { getUser } from "redux/Action";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const Profile: React.FC = () => {
  const profile = useSelector((state: RootState) => state.UserReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch<any>(getUser());
  }, [dispatch]);

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
            <span className="label">First Name:</span> {profile.firstname}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span className="label">Last Name:</span> {profile.lastname}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span className="label">Email:</span> {profile.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span className="label">Phone:</span> {profile.phone}
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
