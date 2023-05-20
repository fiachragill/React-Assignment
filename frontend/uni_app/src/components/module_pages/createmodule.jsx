import React, { useState, useEffect } from 'react';
import '../css/createmodule.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

function CreateModule() {
    const [code, setCode] = useState('');
    const [fullName, setFullName] = useState('');
    const [caSplit, setCaSplit] = useState('');
    const [cohorts, setCohorts] = useState([]);
    const [selectedCohorts, setSelectedCohorts] = useState([]);
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
      if (code === '' || fullName === '' || caSplit === '' || selectedCohorts.length === 0) {
        setAlertSeverity('error');
        setAlertMessage('Please fill out all fields');
        setAlertOpen(true);
        return;
      }
  
      const payload = {
        code: code,
        full_name: fullName,
        ca_split: parseInt(caSplit),
        delivered_to: selectedCohorts.map((cohort) => `http://localhost:8000/api/cohort/${cohort}/`),
      };
  
      console.log('Sending payload:', payload);
  
      fetch('http://127.0.0.1:8000/api/module/', {
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
          setAlertMessage('Module created successfully');
          setAlertOpen(true);
          setCode('');
          setFullName('');
          setCaSplit('');
          setSelectedCohorts([]);
        })
        .catch((error) => {
          console.error('Error:', error);
          setAlertSeverity('error');
          setAlertMessage(`Error creating module: ${error.message}`);
          setAlertOpen(true);
        });
    };
  
    const handleCohortChange = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      setSelectedCohorts(selectedOptions);
    };
  
    return (

        <div>
        <center>
        <h1>Create Module</h1>
        </center>
        <form className="module-form" onSubmit={handleSubmit}>
        <div>
        <label htmlFor="code">Code:</label>
        <input
        type="text"
        id="code"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        />
        </div>
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
        <label htmlFor="caSplit">CA Split:</label>
        <input
        type="number"
        id="caSplit"
        value={caSplit}
        onChange={(event) => setCaSplit(event.target.value)}
        />
        </div>
        <div>
        <label htmlFor="cohort" className="cohort-label">Cohort:</label>
        <select
                 id="cohorts"
                 multiple
                 value={selectedCohorts}
                 onChange={handleCohortChange}
               >
        {cohorts.map((cohort) => (
        <option key={cohort.id} value={cohort.id}>
        {cohort.name}
        </option>
        ))}
        </select>
        </div>
        <button type="submit">Create Module</button>
        </form>
        {alertOpen && (
        <div className="alert-container">
        <div className="alert-wrapper">
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert
        severity={alertSeverity}
        isOpen={alertOpen}
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

export default CreateModule;
        
