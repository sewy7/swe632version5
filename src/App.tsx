import React, { useState, useEffect } from "react";
import type { User, Post } from "./MessageContext";
import {
  Button,
  Container,
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import { Send, ThumbUp, ThumbDown } from "@mui/icons-material";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [upvotes, setUpvotes] = useState<number[]>([]);
  const [downvotes, setDownvotes] = useState<number[]>([]);

  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setPosts(data.posts);
        setCurrentUser(data.users[0]);
        setUpvotes(new Array(data.posts.length).fill(0));
        setDownvotes(new Array(data.posts.length).fill(0));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addPost = () => {
    if (newPost.trim() !== "" && currentUser) {
      const newId = posts.length + 1;
      const newPostObj: Post = {
        id: newId,
        user: currentUser,
        content: newPost,
      };
      setPosts((prevPosts) => [...prevPosts, newPostObj]);
      setNewPost("");
      setUpvotes((prevUpvotes) => [...prevUpvotes, 0]);
      setDownvotes((prevDownvotes) => [...prevDownvotes, 0]);
    }
  };

  const switchUser = () => {
    if (currentUser) {
      const currentIndex = users.findIndex((user) => user.id === currentUser.id);
      const nextIndex = (currentIndex + 1) % users.length;
      setCurrentUser(users[nextIndex]);
    }
  };

  const handleUpvote = (postId: number) => {
    const newUpvotes = [...upvotes];
    newUpvotes[postId - 1]++;
    setUpvotes(newUpvotes);
  };

  const handleDownvote = (postId: number) => {
    const newDownvotes = [...downvotes];
    newDownvotes[postId - 1]++;
    setDownvotes(newDownvotes);
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
              <ListItem key={post.id}>
                <Avatar alt={post.user.name} />
                <Box ml={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.user.name}
                  </Typography>
                  <Typography variant="body1">{post.content}</Typography>
                </Box>
                <Box ml={2}>
                  <Button
                    variant="text"
                    color="primary"
                    startIcon={<ThumbUp />}
                    onClick={() => handleUpvote(post.id)}
                  >
                    Upvote ({upvotes[index]})
                  </Button>
                </Box>
                <Box ml={2}>
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<ThumbDown />}
                    onClick={() => handleDownvote(post.id)}
                  >
                    Downvote ({downvotes[index]})
                  </Button>
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
            label={`Add a new post as ${currentUser?.name || ""}`}
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
