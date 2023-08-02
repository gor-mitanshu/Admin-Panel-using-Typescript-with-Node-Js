import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, Typography, Container } from "@mui/material";
import { AuthActionTypes, User } from "redux/types/authTypes";
import { useNavigate } from "react-router-dom";
import "./ProfileUpdatePage.css";
import { RootState } from "redux/combineReducer";
import api from "utils/api";

const UpdateProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.LoginAuthReducer.token);
  const [formData, setFormData] = useState<User | null>(null);
  const [initialFormData, setInitialFormData] = useState<User | null>(null);
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await api.get(
          `${process.env.REACT_APP_API}/api/getuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success === true && response.status === 200) {
          const user = response.data.user;
          setFormData(user);
          setInitialFormData(user);
        }
        //  else {
        //   console.log("Error fetching user data.");
        // }
      } catch (error: any) {
        // console.log(error);
        if (error.response?.status === 401) {
          // console.log("Mitanshu Unauthorized ProfileUpdate");
          dispatch({ type: AuthActionTypes.LOGOUT });
          navigate("/login");
        }
      }
    };

    fetchUserProfile();
  }, [dispatch, navigate, token]);

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

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      if (formData) {
        await api.put(
          `${process.env.REACT_APP_API}/api/updateuser/${formData._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/profile");
      }
      //  else {
      //   console.log("formData is null");
      // }
    } catch (error: any) {
      // console.log(error);
      if (error.response?.status === 401) {
        // console.log("Mitanshu Unauthorized ProfileUpdate state");
        dispatch({ type: AuthActionTypes.LOGOUT });
        navigate("/login");
      }
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
