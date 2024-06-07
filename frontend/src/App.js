// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Envelopes from './pages/Envelopes';
// Import other page components as needed

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/envelopes" element={<Envelopes />} />
    </Routes>
  );
}

export default App;
