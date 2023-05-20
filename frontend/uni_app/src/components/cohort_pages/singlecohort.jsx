import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import '../css/singlecohort.css';

function Cohort() {
  const { id } = useParams();
  const [cohortData, setCohortData] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cohort/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCohortData(data);
      })
      .catch((error) => {
        console.error("Error fetching cohort: ", error);
      });

    fetch(`http://127.0.0.1:8000/api/student/?cohort=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching students: ", error);
      });
  }, [id]);

  return (
    <div className="single-cohort-container">
      <Card className="single-cohort-card" variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {cohortData.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
          <h3>List of Students:</h3>
          </Typography>
          <div className="student-list">
            {students.map((student) => (
              <h4 key={student.student_id}>
                {student.first_name} {student.last_name} ({student.email})
              </h4>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Cohort;


