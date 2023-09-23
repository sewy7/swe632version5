import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import type { User } from './MessageContext';

interface UserFilterProps {
  users: User[];
  selectedUser: User;
  setSelectedUser: (user: User) => void; // Cast setSelectedUser to the correct type
}

const UserFilter: React.FC<UserFilterProps> = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <Autocomplete
    options={users}
    value={selectedUser}
    onChange={(_, newValue) => newValue !== null && setSelectedUser(newValue)}
    getOptionLabel={(user) => user.name}
    renderInput={(params) => <TextField {...params} label="Select User" />}
    />
  );
};

export default UserFilter;
