import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/degrees.css';

function Degrees() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(response => response.json())
      .then(data => setDegrees(data));
  }, []);

  return (
    <div>
      <center><h1>Degrees</h1></center>
      <div className="degree-container">
        {degrees.map(degree => (
          <div className="degree-card" key={degree.shortcode}>
            <h2>{degree.full_name}</h2>
            <Link to={`/degrees/${degree.shortcode}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Degrees;
