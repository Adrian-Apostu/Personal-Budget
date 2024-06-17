// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Envelopes from './pages/Envelopes';
import "./App.css";
// Import other page components as needed

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/envelopes" element={<Envelopes />} />
      </Routes>
    </div>
  );
}

export default App;