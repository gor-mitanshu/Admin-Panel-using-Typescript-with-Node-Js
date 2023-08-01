import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button } from "@mui/material";
import { RootState } from "redux/combineReducer";
import { getUser } from "redux/Action";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.UserReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch<any>(getUser());
  }, [dispatch]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        User Profile
      </Typography>
      {user ? (
        <div>
          <Typography variant="body1" gutterBottom>
            <strong>First Name:</strong> {user.firstname}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Last Name:</strong> {user.lastname}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone:</strong> {user.phone}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/profile/updateprofile/${user._id}`)}
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
