import React, { useState, useEffect } from 'react';
import '../css/createstudent.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

function CreateStudent() {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then((response) => response.json())
      .then((data) => setCohorts(data))
      .catch((error) => console.error('Error fetching cohorts:', error));
  }, []);

  const handleClose = () => {
    setAlertOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (studentId === '' || firstName === '' || lastName === '' || selectedCohort === '') {
      setAlertSeverity('error');
      setAlertMessage('Please fill out all fields');
      setAlertOpen(true);
      return;
    }

    const email = `${firstName}.${lastName}@mail.dcu.ie`;

    const payload = {
      student_id: studentId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      cohort: `http://127.0.0.1:8000/api/cohort/${selectedCohort}/`,
    };

    console.log('Sending payload:', payload);

    fetch('http://127.0.0.1:8000/api/student/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        setAlertSeverity('success');
        setAlertMessage('Student created successfully');
        setAlertOpen(true);
        setStudentId('');
        setFirstName('');
        setLastName('');
        setSelectedCohort('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setAlertSeverity('error');
        setAlertMessage(`Error creating student: ${error.message}`);
        setAlertOpen(true);
      });
  };

  const handleCohortChange = (event) => {
    setSelectedCohort(event.target.value);
  };

  return (
    <div>
      <center>
        <h1>Create Student</h1>
      </center>
      <form className="create-student-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cohort">Cohort:</label>
          <select id="cohort" value={selectedCohort} onChange={handleCohortChange}>
            <option value="">Select Cohort</option>
            {cohorts.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Student</button>
      </form>
      {alertOpen && (
        <div className="alert-container">
          <div className="alert-wrapper">
            <Stack sx={{ width: '100%', marginBottom: 2 }} spacing={2}>
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
              >
                <AlertTitle>{alertSeverity === 'success' ? 'Success' : 'Error'}</AlertTitle>
                {alertMessage}
              </Alert>
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateStudent;
