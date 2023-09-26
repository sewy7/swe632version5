import React from 'react';
import { Button,Container,Box,TextField,Typography,List, ListItem,Avatar,Divider,Paper, Menu,MenuItem, } from '@mui/material';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Documentation: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ minHeight: '100vh', padding: '16px' }}>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4">Documentation</Typography>
        <Typography variant="body1">
         DA LLAMA is a project webapp made by Amin, Jessie, Ben and Bunny for SWE 632.
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

export default Documentation;
