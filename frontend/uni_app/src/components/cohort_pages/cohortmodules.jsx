import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CoModules() {
  const [module, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/module/')
      .then(response => response.json())
      .then(data => {
        setModules(data);
        const filteredData = data.filter(module => {
          return module.delivered_to.includes(`http://127.0.0.1:8000/api/cohort/${id}/`);
        });
        setFilteredModules(filteredData);
      });
  }, [id]);

  return (
    <div>
      <center><h1>Modules Delivered to { id }</h1></center>
      <table>
        <thead>
          <tr>
            <th>Module Code</th>
            <th>Module Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredModules.map(module => (
            <tr key={module.code}>
              <td>{module.code}</td>
              <td>{module.full_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoModules;
