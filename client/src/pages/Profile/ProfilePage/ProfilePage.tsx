import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Typography, Button } from "@mui/material";
import Loader from "loader/Loader";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import axios from "axios";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const {
    error,
    getAccessTokenSilently,
    user,
    isAuthenticated,
    isLoading,
    getIdTokenClaims,
  } = useAuth0();
  console.log(error);

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

  const callApi = () => {
    axios.get("http://localhost:9558/").then((response) => {
      console.log(response.data);
    });
  };

  const protectedcallApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await axios.get("http://localhost:9558/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
    // axios
    //   .get("http://localhost:9558/protected")
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

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
          <div style={{ marginTop: "50px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "50px !important", marginRight: "20px" }}
              onClick={() => {
                callApi();
              }}
            >
              Call API
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "50px !important" }}
              onClick={() => {
                protectedcallApi();
              }}
            >
              Protected Route API{" "}
            </Button>
          </div>
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
