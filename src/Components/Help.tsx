// Help.tsx
import React from 'react';
import {   Button,Container,Box,TextField,Typography,List, ListItem,Avatar,Divider,Paper, Menu,MenuItem,
} from '@mui/material';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";


const Help: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ minHeight: '100vh', padding: '16px' }}>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4">How to Use the App</Typography>
        <Typography variant="body1">
          Welcome to DA LLAMA, the app for sharing and voting on posts! Here's how to use it:
        </Typography>
        <ol>
          <li>
            <Typography variant="body1">
              No need to login choose between the pre-existing user profiles.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Scroll through the feed to view existing posts.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Click on the "Like" (thumb up) or "Dislike" (thumb down) buttons to vote on a post.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              To create a new post, enter your text in the input field and click "Post."
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              To switch users, click the "Switch User" button at the top.
            </Typography>
          </li>
        </ol>
        <Typography variant="body1">
          Have fun using DA LLAMA!
        </Typography>
      </Paper>
      <Box mt={4} display="flex" justifyContent="center">
        <Link to="https://reachforthesky70.github.io/revisedswe632project/">
          <Button variant="outlined" color="primary">
            Back
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Help;
