import React from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import "./ProfileUpdatePage.css";
import Loader from "loader/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const UpdateProfile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md">
      <Typography className="title">Update Profile</Typography>
      {isAuthenticated ? (
        <form
        // onSubmit={handleUpdate}
        >
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstname"
            value={user?.given_name}
            // onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastname"
            value={user?.family_name}
            // onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={user?.email}
            // onChange={handleChange}
          />
          {/* <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          /> */}
          <Button
            variant="contained"
            color="error"
            type="button"
            sx={{ marginRight: "8px" }}
            // disabled={isDataChanged}
            onClick={() => navigate("/profile")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // disabled={!isDataChanged}
          >
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
