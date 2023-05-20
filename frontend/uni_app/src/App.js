import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/navbar.jsx';
import Home from './components/home.jsx';
import Degrees from './components/degree_pages/degrees.jsx';
import Degree from './components/degree_pages/singledegree.jsx';
import CreateDegree from './components/degree_pages/createdegree.jsx';
import Cohorts from './components/cohort_pages/cohorts.jsx';
import Cohort from './components/cohort_pages/singlecohort.jsx';
import CreateCohort from './components/cohort_pages/createcohort';
import Modules from './components/module_pages/modules.jsx';
import Module from './components/module_pages/module.jsx';
import CreateModule from './components/module_pages/createmodule.jsx';
import Student from './components/student_pages/student.jsx';
import CoModules from './components/cohort_pages/cohortmodules.jsx';
import CreateStudent from './components/student_pages/createstudent.jsx';
import SetGrade from './components/student_pages/setgrade.jsx';


function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/degrees" element={<Degrees />} />
        <Route path="/create-degree" element={<CreateDegree />} />
        <Route path="/degrees/:shortcode" element={<Degree />} />
        <Route path="/cohorts" element={<Cohorts />} />
        <Route path="/cohort/:id" element={<Cohort />} />
        <Route path="/create-cohort" element={<CreateCohort />} />
        <Route path="/modules" element={<Modules/>} />,
        <Route path="/module/:code" element={<Module/>} />,
        <Route path="/create-module" element={<CreateModule/>} />,
        <Route path="/student/:student_id" element={<Student/>} />,
        <Route path="/cohort/:id/modules" element={<CoModules/>} />,
        <Route path="/create-student" element={<CreateStudent/>} />,
        <Route path="/student/:student_id/setgrade" element={<SetGrade />} />
      </Routes>
    </Router>
  );
}

export default App;

