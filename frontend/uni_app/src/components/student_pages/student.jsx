import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../css/student.css";


function Student() {
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState(null);
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const { student_id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/${student_id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No student found with id');
        }
        return response.json();
      })
      .then((data) => {
        setStudent(data);
        // Fetch modules for the student's cohort
        fetch(`http://127.0.0.1:8000/api/module/`)
          .then((response) => response.json())
          .then((allModules) => {
            const cohortModules = allModules.filter((module) =>
              module.delivered_to.includes(data.cohort)
            );
            setModules(cohortModules);
          });
      })
      .catch((error) => setError(error.message));

    fetch(`http://127.0.0.1:8000/api/grade/?student=${student_id}`)
      .then((response) => response.json())
      .then((data) => {
        const extractedGrades = data.map((grade) => {
          const moduleCode = grade.module.split('/').slice(-2, -1)[0];
          return {
            ...grade,
            moduleCode,
          };
        });
        setGrades(extractedGrades);
      })
      .catch((error) => console.error(error));
  }, [student_id]);

  const combinedData = modules.map((module) => {
    const grade = grades?.find((g) => g.moduleCode === module.code) || {};
    return {
      moduleCode: module.code,
      ca_mark: grade.ca_mark || null,
      exam_mark: grade.exam_mark || null,
      total_grade: grade.total_grade || null,
    };
  });

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', width: '100%', marginRight: '80px' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%', textAlign: 'center' }}>
        {student && (
          <div>
            <h1>{`${student.first_name} ${student.last_name}`}</h1>
            <p>{`Email: ${student.email}`}</p>
            <p>{`Cohort: ${student.cohort.split('/').slice(-2, -1)[0]}`}</p>
            {/* Add the "Set Grades" button here */}
            <Link to={`/student/${student_id}/setgrade`} className="link-button">
              <button className="button" style={{ marginBottom: '20px' }}>Set Grades</button>
            </Link>
          </div>
        )}
        {modules && (
          <table>
            <thead>
              <tr>
                <th>Module</th>
                <th>CA Mark</th>
                <th>Exam Mark</th>
                <th>Total Grade</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.moduleCode}</td>
                  <td>{data.ca_mark}</td>
                  <td>{data.exam_mark}</td>
                  <td>{data.total_grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Student;