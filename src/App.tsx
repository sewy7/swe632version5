import React, { useState, useEffect, useRef } from "react";
import {
  Button,Container,Box,TextField,Typography,List, ListItem,Avatar,Divider,Paper, Menu,MenuItem,
} from "@mui/material";
import { Send, ThumbUp, ThumbDown } from "@mui/icons-material";
import jsonData from "./data.json";
import UserChangedNotification from "./Components/UserChangedNotification";
import { Post, User } from "./Components/MessageContext";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Help from "./Components/Help";
import Documentation from "./Components/Documentation";

function App() {
  const [users, setUsers] = useState<User[]>(jsonData.users);
  const [posts, setPosts] = useState<Post[]>(jsonData.posts);
  const [newPost, setNewPost] = useState("");
  const [currentID, setCurrentID] = useState(0);
  const [currentUser, setCurrentUser] = useState<User>(jsonData.users[0]);
  const [upvotes, setUpvotes] = useState(new Array(posts.length).fill(0));
  const [downvotes, setDownvotes] = useState(new Array(posts.length).fill(0));
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const addPost = () => {
    if (newPost.trim() !== "" && currentUser) {
      const newPostObj = {
        id: currentID,
        user: currentUser,
        content: newPost,
        votes: { upvotes: 0, downvotes: 0 },
      };

      setCurrentID(currentID + 1);
      setPosts((prevPosts) => [newPostObj, ...prevPosts]);
      setNewPost("");
      setUpvotes((prevUpvotes) => [...prevUpvotes, 0]);
      setDownvotes((prevDownvotes) => [...prevDownvotes, 0]);
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [posts]);

  const openUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const closeUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleUserSelection = (selectedUser: User) => {
    setCurrentUser(selectedUser);
    setIsNotificationOpen(true);

    setTimeout(() => {
      setIsNotificationOpen(false);
    }, 5000);

    closeUserMenu();
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

  const filteredPosts = selectedUser
    ? posts.filter((post) => post.user.id === selectedUser.id)
    : posts;

  return (
    <Container maxWidth="sm" style={{ minHeight: "100vh", padding: "16px" }}>
      <Typography variant="h1" align="center">
        DA LLAMA
      </Typography>
      <Divider />
      <Box mt={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Feed</Typography>
          <Button
            onClick={openUserMenu}
            variant="outlined"
            color="primary"
            aria-controls="user-menu"
            aria-haspopup="true"
          >
            Switch User ({currentUser.name})
          </Button>
          <UserChangedNotification
            open={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
            userName={currentUser}
          />
          <Menu
            id="user-menu"
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={closeUserMenu}
          >
            {users.map((user) => (
              <MenuItem
                key={user.id}
                onClick={() => handleUserSelection(user)}
              >
                {user.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
       
        <Paper elevation={3}>
          <div
            style={{ maxHeight: "400px", overflowY: "auto" }}
            ref={messageContainerRef}
          >
            <List>
              {filteredPosts.map((post, index) => (
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
        <Box mt={2} display="flex" alignItems="center">
  <Typography variant="h4">Filter:</Typography>
  <Button
    onClick={() => setSelectedUser(null)}
    variant="outlined"
    color="primary"
    size="small"
    style={{ marginLeft: '10px', marginRight: '10px' }} // Add margin to this button
  >
    All Users
  </Button>
  {users.map((user, index) => (
    <Button
      key={user.id}
      onClick={() => setSelectedUser(user)}
      variant="outlined"
      color="primary"
      size="small"
      style={{ marginRight: '8px' }} // Add margin to all user buttons
    >
      {user.name}
    </Button>
  ))}
</Box>

      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        <Link to="/Help">
          <Button variant="outlined" color="primary">
            Help
          </Button>
        </Link>
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        <Link to="/documentation">
          <Button variant="outlined" color="primary">
            Documentation
          </Button>
        </Link>
      </Box>
      <Routes>
        <Route path="/help" Component={Help} />
        <Route path="/documentation" Component={Documentation} />
      </Routes>
    </Container>
  );
}

export default App;
