import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Typography, Button } from "@mui/material";
import Loader from "loader/Loader";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const navigate = useNavigate();

  const lel = async () => {
    const token = await getIdTokenClaims();
    console.log(token);
  };
  useEffect(() => {
    lel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md">
      <Typography className="profile-title">Profile</Typography>
      {isAuthenticated ? (
        <div>
          {/* <img src={user?.picture} alt="" style={{ borderRadius: "50%" }} /> */}
          <Typography variant="body1" gutterBottom>
            <span className="label">Name:</span>{" "}
            <span className="label-info">
              {user?.given_name + " " + user?.family_name}
            </span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span className="label">Email:</span>{" "}
            <span className="label-info">{user?.email}</span>
          </Typography>
          {/* Other profile information here */}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "5px !important" }}
            onClick={() => {
              // Handle profile update
              navigate(`/profile/updateprofile/${user?.sub}`);
            }}
          >
            Update Profile
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="body1" gutterBottom>
            Please log in to view your profile.
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default Profile;
