import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import "./css/home.css";

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <div className="container">
          <Typography variant="h2" component="h1" gutterBottom>
           University Registration System!
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'SID: 21444356\n'}
          </Typography>
          <Typography variant="body1"></Typography>
        </div>
      </Container>
    </Box>
  );
}
