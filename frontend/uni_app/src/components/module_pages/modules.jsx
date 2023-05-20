import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/modules.css';

function Modules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/module/')
      .then(response => response.json())
      .then(data => setModules(data));
  }, []);

  return (
    <div>
      <center><h1>Modules</h1></center>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Full Name</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {modules.map(module => (
            <tr key={module.code}>
              <td>{module.code}</td>
              <td>{module.full_name}</td>
              <td><Link to={`/module/${module.code}`}>Details</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Modules;
