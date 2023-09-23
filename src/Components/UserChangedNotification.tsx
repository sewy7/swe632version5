import React from "react";
import { Snackbar, Paper, Typography } from "@mui/material";
import { Alert } from "@mui/material";
import type { User } from './MessageContext';

interface UserChangedNotificationProps {
  open: boolean;
  onClose: () => void;
  userName: User;
}

const UserChangedNotification: React.FC<UserChangedNotificationProps> = ({ open, onClose, userName }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position it at the top right
    >
      <Paper elevation={3} style={{ backgroundColor: "green", padding: "16px", minWidth: "200px" }}>
        <Typography variant="body1" style={{ color: "white" }}>
          User Changed to: {userName.name}
        </Typography>
      </Paper>
    </Snackbar>
  );
};

export default UserChangedNotification;
