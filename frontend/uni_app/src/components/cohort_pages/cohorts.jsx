import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/cohorts.css';

function Cohorts() {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then(response => response.json())
      .then(data => setCohorts(data));
  }, []);

  return (
    <div>
      <center><h1>Cohorts</h1></center>
      <div className="cohort-container">
        {cohorts.map(cohort => (
          <div key={cohort.id} className="cohort-card">
            <h3>{cohort.name}</h3>
            <div className="cohort-buttons">
              <Link to={`/cohort/${cohort.id}`}>
                <button>View Students</button>
              </Link>
              <Link to={`/cohort/${cohort.id}/modules`}>
                <button>View Modules</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cohorts;

