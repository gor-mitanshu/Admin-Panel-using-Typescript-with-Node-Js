import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logout, updateLoggedInUser } from "redux/Action";
import { User } from "redux/types/authTypes";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.UserLoggedInReducer.user);
  const [userDataToUpdate, setUserDataToUpdate] = useState<User | null>(null);
  const [updatedData, setUpdatedData] = useState<Partial<User>>({});

  useEffect(() => {
    dispatch<any>(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUpdatedData(user);
    }
  }, [user]);

  const handleUpdateUser = () => {
    if (userDataToUpdate) {
      const updatedUserData = { ...userDataToUpdate, ...updatedData };
      dispatch<any>(updateLoggedInUser(updatedUserData));
      setUserDataToUpdate(null);
    }
  };

  const handleLogout = () => {
    dispatch<any>(logout());
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <Typography variant="h4">Welcome, {user.firstname}!</Typography>
      <TextField
        label="First Name"
        value={updatedData.firstname || ""}
        onChange={(e: { target: { value: any } }) =>
          setUpdatedData({ ...updatedData, firstname: e.target.value })
        }
      />
      <TextField
        label="Last Name"
        value={updatedData.lastname || ""}
        onChange={(e: { target: { value: any } }) =>
          setUpdatedData({ ...updatedData, lastname: e.target.value })
        }
      />
      <TextField
        label="Phone"
        value={updatedData.phone || ""}
        onChange={(e: { target: { value: any } }) =>
          setUpdatedData({ ...updatedData, phone: e.target.value })
        }
      />
      <TextField
        label="Email"
        value={updatedData.email || ""}
        onChange={(e: { target: { value: any } }) =>
          setUpdatedData({ ...updatedData, email: e.target.value })
        }
      />
      {userDataToUpdate ? (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateUser}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setUserDataToUpdate(null)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button variant="contained" onClick={() => setUserDataToUpdate(user)}>
          Update User
        </Button>
      )}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
