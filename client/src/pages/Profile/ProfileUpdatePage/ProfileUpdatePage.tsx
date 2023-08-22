import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import "./ProfileUpdatePage.css";
import Loader from "loader/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProfile: React.FC = () => {
  const { sub } = useParams();
  const {
    user,
    isAuthenticated,
    isLoading,
    // getIdTokenClaims,
    // getAccessTokenSilently,
  } = useAuth0();
  const navigate = useNavigate();

  const tokenssss = async () => {
    // const getAccessToken = await getAccessTokenSilently();
    // console.log(getAccessToken);
    // const getIdToken = await getIdTokenClaims();
    // console.log(getIdToken);
  };
  const [userDetails, setUserDetails] = useState<any>({
    given_name: user?.given_name || "",
    family_name: user?.family_name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
  });

  const getUser = async () => {
    // const response = await axios.get(
    //   `${process.env.REACT_APP_API}/api/getuser/${id}`
    // );
    // console.log(response);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails: any) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const updateUser = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/updateuser/${sub}`,
        userDetails
      );
      console.log(response);
      if (response.status === 200 && response.data.success === true) {
        navigate("/profile");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    tokenssss();
    getUser();
    if (user && !isLoading) {
      setUserDetails({
        given_name: user.given_name || "",
        family_name: user.family_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md">
      <Typography className="title">Update Profile</Typography>
      {isAuthenticated ? (
        <form onSubmit={(e) => updateUser(e)}>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="given_name"
            value={userDetails.given_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="family_name"
            value={userDetails.family_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone_number"
            value={userDetails.phone_number}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="error"
            type="button"
            sx={{ marginRight: "8px" }}
            onClick={() => navigate("/profile")}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Update Profile
          </Button>
        </form>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default UpdateProfile;
