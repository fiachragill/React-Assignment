import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../css/module.css";

function Module() {
  const { code } = useParams();
  const [module, setModule] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/${code}/`)
      .then((response) => response.json())
      .then((data) => {
        setModule(data);
      })
      .catch((error) => {
        console.error("Error fetching module: ", error);
      });
  }, [code]);

  return (
    <Card className="single-module" variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {module.full_name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {module.code}
          <br />
          {module.ca_split}% Continuous Assessment
          <br />
        </Typography>
        <Typography variant="body2" component="p">
          List of Cohorts:
        </Typography>
        <ul>
          {module.delivered_to &&
            module.delivered_to.map((cohortUrl) => (
              <li key={cohortUrl}>{cohortUrl.split("/")[5]}</li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default Module;
