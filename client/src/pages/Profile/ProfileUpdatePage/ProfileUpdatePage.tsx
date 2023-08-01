import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, Typography, Container } from "@mui/material";
import { User } from "redux/types/authTypes";
import { RootState } from "redux/combineReducer";
import { getUser, updateUser } from "redux/Action";
import { useNavigate } from "react-router-dom";
import "./ProfileUpdatePage.css";

const UpdateProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.UserReducer.user);
  const [formData, setFormData] = useState<User | null>(null);
  const [initialFormData, setInitialFormData] = useState<User | null>(null);
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData(user);
      setInitialFormData(user);
    } else {
      dispatch<any>(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (formData && initialFormData) {
      const isChanged =
        formData.firstname !== initialFormData.firstname ||
        formData.lastname !== initialFormData.lastname ||
        formData.email !== initialFormData.email ||
        formData.phone !== initialFormData.phone;

      setIsDataChanged(isChanged);
    }
  }, [formData, initialFormData]);

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
      setIsDataChanged(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography className="title">Update Profile</Typography>
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
            disabled={!isDataChanged}
          >
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
