import React, { useState } from 'react';
import '../css/createdegrees.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

function CreateDegree() {
  const [fullName, setFullName] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleClose = () => {
    setAlertOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fullName === '' || shortcode === '') {
      setAlertSeverity('error');
      setAlertMessage('Please fill out all fields');
      setAlertOpen(true);
      return;
    }

    fetch('http://127.0.0.1:8000/api/degree/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: fullName,
        shortcode: shortcode
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setAlertSeverity('success');
        setAlertMessage('Degree created successfully');
        setAlertOpen(true);
        setFullName('');
        setShortcode('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <center><h1>Create Degree</h1></center>
      <form className="degree-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="shortcode">Shortcode:</label>
          <input
            type="text"
            id="shortcode"
            value={shortcode}
            onChange={(event) => setShortcode(event.target.value)}
          />
        </div>
        <button type="submit">Create Degree</button>
      </form>
      {alertOpen && (
        <Stack spacing={2} className="alert-container">
          <div className="alert-wrapper">
            <Alert
              severity={alertSeverity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ width: '100%' }}
            >
              <AlertTitle>{alertSeverity.toUpperCase()}</AlertTitle>
              {alertMessage}
            </Alert>
          </div>
        </Stack>
      )}
    </div>
  );
}

export default CreateDegree;
