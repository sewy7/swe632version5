import React from 'react';
import { Container,Typography,Paper,} from '@mui/material';

const Documentation: React.FC = () => {
  return (
    <Container maxWidth="sm" style={{ minHeight: '100vh', padding: '16px' }}>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4">Documentation</Typography>
        <Typography variant="body1">
         DA LLAMA is a project webapp made by Amin, Jessie, Ben and Bunny for SWE 632.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Documentation;
