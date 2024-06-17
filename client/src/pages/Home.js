// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
  let navigate = useNavigate();
  
  const goToEnvelopes = () => {
    navigate('/envelopes');
  };

  return (
    <div>
      <h1>Welcome to the Personal Budget Manager</h1>
      <Button onClick={goToEnvelopes}>Manage Envelopes</Button>
    </div>
  );
};

export default Home;
