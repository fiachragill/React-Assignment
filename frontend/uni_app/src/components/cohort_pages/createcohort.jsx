import React, { useState, useEffect } from 'react';
import '../css/createcohorts.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

function CreateCohort() {
  const [year, setYear] = useState('');
  const [degree, setDegree] = useState('');
  const [name, setName] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [availableDegrees, setAvailableDegrees] = useState([]);

  const fetchDegrees = () => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then((response) => response.json())
      .then((data) => {
        setAvailableDegrees(data);
      })
      .catch((error) => {
        console.error('Error fetching degrees:', error);
      });
  };

  useEffect(() => {
    fetchDegrees();
  }, []);

  const handleClose = () => {
    setAlertOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (year === '' || degree === '' || name === '') {
      setAlertSeverity('error');
      setAlertMessage('Please fill out all fields');
      setAlertOpen(true);
      return;
    }
  
    const id = degree.toUpperCase() + year;
  
    console.log(`Making API call with id: ${id}`);
    console.log(`Making API call with year: ${year}`);
    console.log(`Making API call with degree: ${degree}`);
    console.log(`Making API call with name: ${name}`);
  
    fetch('http://127.0.0.1:8000/api/cohort/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        year: year,
        degree: `http://127.0.0.1:8000/api/degree/${degree}/`,
        name: name,
      }),
    })
      .then((response) => {
        console.log(`Received response: ${response}`);
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        setAlertSeverity('success');
        setAlertMessage('Cohort created successfully');
        setAlertOpen(true);
        setYear('');
        setDegree('');
        setName('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div>
      <center><h1>Create Cohort</h1></center>
      <form className="cohort-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="degree">Degree:</label>
          <select
            id="degree"
            value={degree.shortcode}
            onChange={(event) => setDegree(event.target.value)}
          >
            <option value="">Select Degree</option>
            {availableDegrees.map((degreeItem) => (
              <option key={degreeItem.shortcode} value={degreeItem.shortcode}>
                {degreeItem.full_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <button type="submit">Create Cohort</button>
      </form>
      {alertOpen && (
        <Stack spacing={2} className="alert-container">
          <div className="alert-wrapper">
            <Alert severity={alertSeverity} action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            } sx={{ width: '100%' }}>
              <AlertTitle>{alertSeverity.toUpperCase()}</AlertTitle>
              {alertMessage}
            </Alert>
          </div>
        </Stack>
      )}
    </div>
  );
}
export default CreateCohort;

