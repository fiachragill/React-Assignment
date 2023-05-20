import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../css/singledegree.css";

function Degree() {
  const { shortcode } = useParams();
  const [degree, setDegree] = useState({});
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    // Need for degree.full_name
    fetch(`http://127.0.0.1:8000/api/degree/${shortcode}/`)
      .then((response) => response.json())
      .then((data) => {
        setDegree(data);
      })
      .catch((error) => {
        console.error("Error fetching degree: ", error);
      });

    fetch(`http://127.0.0.1:8000/api/cohort/?degree=${shortcode}`)
      .then((response) => response.json())
      .then((data) => {
        setCohorts(data);
      })
      .catch((error) => {
        console.error("Error fetching cohorts: ", error);
      });
  }, [shortcode]);

  return (
    <Card className="single-degree" variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {degree.full_name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {degree.shortcode}
        </Typography>
        <Typography variant="body2" component="p">
          List of Cohorts:
        </Typography>
        <ul>
          {cohorts.map((cohort) => (
            <li key={cohort.id}>{cohort.name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default Degree;
