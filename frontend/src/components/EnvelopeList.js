import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEnvelope, deleteEnvelope } from '../redux/envelopesSlice';

function EnvelopeList({ envelopes }) {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editBalance, setEditBalance] = useState('');

  const handleEdit = (envelope) => {
    setEditId(envelope.id);
    setEditName(envelope.name);
    setEditBalance(envelope.balance);
  };

  const handleUpdate = (id) => {
    dispatch(updateEnvelope({ id, envelope: { name: editName, balance: parseFloat(editBalance) } }));
    setEditId(null); // Reset editing state
  };

  const handleDelete = (id) => {
    dispatch(deleteEnvelope(id));
  };

  return (
    <ul>
      {envelopes.map(envelope => {
        const balance = typeof envelope.balance === 'number' ? envelope.balance : parseFloat(envelope.balance);
        const displayBalance = isNaN(balance) ? "Invalid balance" : balance.toFixed(2);

        return (
          <li key={envelope.id}>
            {editId === envelope.id ? (
              <div>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input type="number" value={editBalance} onChange={(e) => setEditBalance(e.target.value)} />
                <button onClick={() => handleUpdate(envelope.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                ID: {envelope.id} - {envelope.name}: ${displayBalance}
                <button onClick={() => handleEdit(envelope)}>Edit</button>
                <button onClick={() => handleDelete(envelope.id)}>Delete</button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default EnvelopeList;
