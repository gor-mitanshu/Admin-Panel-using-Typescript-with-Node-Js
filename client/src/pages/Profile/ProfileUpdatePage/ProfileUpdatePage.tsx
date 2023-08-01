import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, Typography, Container } from "@mui/material";
import { User } from "redux/types/authTypes";
import { RootState } from "redux/combineReducer";
import { getUser, updateUser } from "redux/Action";
import { useNavigate } from "react-router-dom";

const UpdateProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.UserReducer.user);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      dispatch<any>(getUser());
    }
  }, [dispatch, user]);

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData) {
      dispatch<any>(updateUser(formData));
      navigate("/profile");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        Update Profile
      </Typography>
      {formData ? (
        <form onSubmit={handleUpdate}>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Update Profile
          </Button>
        </form>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </Container>
  );
};

export default UpdateProfile;
