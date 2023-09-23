import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Box, TextField, Typography, List, ListItem, Avatar, Divider, Paper,} from "@mui/material";
import { Send, ThumbUp, ThumbDown  } from "@mui/icons-material";
import jsonData from "./data.json";
import UserChangedNotification from "./Components/UserChangedNotification";
import { Post, User } from "./Components/MessageContext";

function App() {
  const [users, setUsers] = useState<User[]>(jsonData.users);
  const [posts, setPosts] = useState<Post[]>(jsonData.posts);
  const [newPost, setNewPost] = useState("");
  const [currentID, setCurrentID] = useState(0);
  const [currentUser, setCurrentUser] = useState<User>(jsonData.users[0])
  const [upvotes, setUpvotes] = useState(new Array(posts.length).fill(0));
  const [downvotes, setDownvotes] = useState(new Array(posts.length).fill(0));
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const addPost = () => {
    if (newPost.trim() !== "" && currentUser) {
      const newPostObj = {
        id: currentID,
        user: currentUser,
        content: newPost,
        votes: { upvotes: 0, downvotes: 0 },
      };

      setCurrentID(currentID + 1);

      setPosts((prevPosts) => [...prevPosts, newPostObj]);
      setNewPost("");
      setUpvotes((prevUpvotes) => [...prevUpvotes, 0]);
      setDownvotes((prevDownvotes) => [...prevDownvotes, 0]);
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [posts]);

  const switchUser = () => {
    if (currentUser) {
      const currentIndex = users.indexOf(currentUser);
      const nextIndex = (currentIndex + 1) % users.length;
      const newUser = users[nextIndex];
      
      setCurrentUser(newUser);
      setIsNotificationOpen(true);
  
      setTimeout(() => {
        setIsNotificationOpen(false);
      }, 5000);
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
          <UserChangedNotification
        open={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        userName={currentUser}
      />
        </Box>
        <Paper elevation={3}>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}ref={messageContainerRef}>
          <List>
            {posts.map((post, index) => (
              <ListItem key={index}>
                <Avatar>{post.user.name[0]}</Avatar>
                <Box ml={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.user.name}
                  </Typography>
                  <Typography variant="body1">{post.content}</Typography>
                </Box>
                <Box ml="Auto">
                  <Button
                    variant="text"
                    color="primary"
                    startIcon={<ThumbUp />}
                    onClick={() => handleUpvote(post.id)}
                  >
                    ({upvotes[index]})
                  </Button>
                </Box>
                <Box ml={2}>
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<ThumbDown />}
                    onClick={() => handleDownvote(post.id)}
                  >
                    ({downvotes[index]})
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
          </div>
        </Paper>
      </Box>
      <Box mt={2}>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            label={`Add a new post as ${currentUser.name}`}
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