import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Typography, Button } from "@mui/material";
import Loader from "loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userData, setUserData] = useState<any>(null);

  const fetchUserData = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/getuser/${user?.sub}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUserData(response.data.data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isLoading || !userData) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md">
      <Typography className="profile-title">Profile</Typography>
      <div>
        <Typography variant="body1" gutterBottom>
          <span className="label">Name:</span>{" "}
          <span className="label-info">
            {userData.given_name + " " + userData.family_name}
          </span>
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className="label">Email:</span>{" "}
          <span className="label-info">{userData.email}</span>
        </Typography>
        {userData.phone_number ? (
          <Typography variant="body1" gutterBottom>
            <span className="label">Phone:</span>{" "}
            <span className="label-info">{userData.phone_number}</span>
          </Typography>
        ) : null}

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "5px !important" }}
          onClick={() => {
            navigate(`/profile/updateprofile/${user?.sub}`);
          }}
        >
          Update Profile
        </Button>
      </div>
    </Container>
  );
};

export default Profile;
