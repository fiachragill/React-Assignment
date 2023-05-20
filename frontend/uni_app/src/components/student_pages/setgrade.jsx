import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import '../css/setgrade.css';

function SetGrade() {
  const { student_id } = useParams();
  const [modules, setModules] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [caMark, setCaMark] = useState('');
  const [examMark, setExamMark] = useState('');
  const [finalGrade, setFinalGrade] = useState('');
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleClose = () => {
    setAlertOpen(false);
  };

  const navigateToStudentPage = () => {
    navigate(`/student/${student_id}/`);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/${student_id}/`)
      .then((response) => response.json())
      .then((data) => {
        fetch(`http://127.0.0.1:8000/api/module/`)
          .then((response) => response.json())
          .then((allModules) => {
            const cohortModules = allModules.filter((module) =>
              module.delivered_to.includes(data.cohort)
            );
            setModules(cohortModules);
          });

        fetch(`http://127.0.0.1:8000/api/grade/?student=${student_id}`)
          .then((response) => response.json())
          .then((data) => setGrades(data));
      })
      .catch((error) => console.error(error));
  }, [student_id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedModule === '' || !caMark || !examMark) {
      setAlertSeverity('error');
      setAlertMessage('Please fill in all fields');
      setAlertOpen(true);
      return;
    }
    

    // Calculate final grade and set state
    const moduleInfo = modules.find((module) => module.code === selectedModule);
    const weight = moduleInfo.ca_split / 100;
    const calculatedFinalGrade = caMark * weight + examMark * (1 - weight);
    setFinalGrade(calculatedFinalGrade.toFixed(2));

    // Find the corresponding grade object
    const gradeObj = grades.find((grade) => grade.module.endsWith(`${selectedModule}/`));

    if (!gradeObj) {
      setAlertSeverity('error');
      setAlertMessage('Grade not found for selected module');
      setAlertOpen(true);
      return;
    }
    

    const payload = {
      ca_mark: caMark,
      exam_mark: examMark,
      total_grade: calculatedFinalGrade,
    };

    console.log('Sending payload:', payload);

    // Send PATCH request to update grade in the database
    fetch(`http://127.0.0.1:8000/api/grade/${gradeObj.id}/`, {
      method: 'PATCH',
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
        console.log('Grade updated:', data);
        setAlertSeverity('success');
        setAlertMessage('Grade updated successfully');
        setAlertOpen(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        console.error('Payload:', payload);
        setAlertSeverity('error');
        setAlertMessage('Error updating grade');
        setAlertOpen(true);
      });
  };

  return (
    <div className="setgrade-page">
      <p><br></br></p>
    <div>
      <div className="setgrade-container">
        <center>
          <h1>Set Grades</h1>
        </center>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="module">Module:</label>
            <select
              id="module"
              value={selectedModule}
              onChange={(event) => setSelectedModule(event.target.value)}
            >
              <option key="" value="">
                --Select a module--
              </option>
              {modules.map((module, index) => (
                <option key={module.id || index} value={module.code}>
                  {module.code}
                </option>              
              ))}

            </select>

          </div>
          <div>
            <label htmlFor="caMark">CA Mark:</label>
            <input
              type="number"
              id="caMark"
              value={caMark}
              onChange={(event) => setCaMark(parseFloat(event.target.value))}
            />
          </div>
          <div>
            <label htmlFor="examMark">Exam Mark:</label>
            <input
              type="number"
              id="examMark"
              value={examMark}
              onChange={(event) => setExamMark(parseFloat(event.target.value))}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {finalGrade && (
          <div>
            <h3>Final Grade: {finalGrade}</h3>
          </div>
        )}
        <button onClick={navigateToStudentPage}>Back to Student</button>
      </div>
      {alertOpen && (
        <div className="alert-container">
          <Stack sx={{ width: '100%' }} spacing={2}>
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
      )}
    </div>
    </div>
  );
}
export default SetGrade;