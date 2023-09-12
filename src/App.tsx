import React, { useState, useEffect } from "react";
import type { User, Post} from './MessageContext';
import { Button, Container, Box, TextField, Typography, List, ListItem, Avatar, Divider, Paper,} from "@mui/material";
import { Send } from "@mui/icons-material";
import jsonData from "./data.json";


function App() {
  const [users, setUsers] = useState(jsonData.users);
  const [posts, setPosts] = useState(jsonData.posts);
  const [newPost, setNewPost] = useState("");
  const [currentUser, setCurrentUser] = useState(users[0]);

  const addPost = () => {
    if (newPost.trim() !== "" && currentUser) {
      const newPostObj = {
        user: currentUser,
        content: newPost,
      };
      setPosts((prevPosts) => [...prevPosts, newPostObj]);
      setNewPost("");
    }
  };

  const switchUser = () => {
    if (currentUser) {
      const currentIndex = users.indexOf(currentUser);
      const nextIndex = (currentIndex + 1) % users.length;
      setCurrentUser(users[nextIndex]);
    }
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: "100vh", padding: "16px" }}>
      <Typography variant="h1" align="center">
        DA LLAMA
      </Typography>
      <Divider />
      <Box mt={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Feed</Typography>
          <Button onClick={switchUser} variant="outlined" color="primary">
            Switch User
          </Button>
        </Box>
        <Paper elevation={3}>
          <List>
            {posts.map((post, index) => (
              <ListItem key={index}>
                <Avatar>{post.user[0]}</Avatar>
                <Box ml={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.user}
                  </Typography>
                  <Typography variant="body1">{post.content}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      <Box mt={2}>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            label={`Add a new post as ${currentUser}`}
            variant="outlined"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button
            onClick={addPost}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Send />}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App;