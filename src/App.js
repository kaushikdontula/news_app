import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

import Form from './components/Form';
import Intro from './components/Intro';

function App() {
  return (
    <Router>
      <div>
        <Intro />
        <Form />
      </div>
    </Router>
  );
}

export default App;
