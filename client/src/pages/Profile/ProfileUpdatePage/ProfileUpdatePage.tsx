import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import "./ProfileUpdatePage.css";
import axios from "axios";
import Loader from "loader/Loader";

const UpdateProfile = () => {
  const { sub } = useParams();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    given_name: "",
    family_name: "",
    email: "",
    phone_number: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/getuser/${sub}`
      );
      if (response.status === 200) {
        const userData = response.data.data;
        setUserDetails(userData);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/updateuser/${sub}`,
        userDetails
      );
      if (response.status === 200 && response.data.success === true) {
        navigate("/profile");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md">
      <Typography className="title">Update Profile</Typography>
      <form onSubmit={handleUpdate}>
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
    </Container>
  );
};

export default UpdateProfile;
