//frontend/src/components/EnvelopeForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEnvelope } from '../redux/envelopesSlice';

function EnvelopeForm() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEnvelope({ name, balance: parseFloat(balance) }));
    setName('');
    setBalance('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Envelope Name" required />
      <input type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="Initial Balance" required />
      <button type="submit">Add Envelope</button>
    </form>
  );
}

export default EnvelopeForm;
