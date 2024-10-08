import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { transferFunds } from '../redux/envelopesSlice';

function TransferFundsForm() {
    const [fromId, setFromId] = useState('');
    const [toId, setToId] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); 
        dispatch(transferFunds({ fromId, toId, amount: parseFloat(amount) }))
            .unwrap()
            .then(() => {
                setFromId('');
                setToId('');
                setAmount('');
            })
            .catch((error) => {
                console.error('Transfer failed:', error);
                setError(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="fromId">From Envelope ID:</label>
            <input
                type="text"
                id="fromId"
                name="fromId"
                value={fromId}
                onChange={(e) => setFromId(e.target.value)}
                placeholder="From Envelope ID"
                required
            />
            <label htmlFor="toId">To Envelope ID:</label>
            <input
                type="text"
                id="toId"
                name="toId"
                value={toId}
                onChange={(e) => setToId(e.target.value)}
                placeholder="To Envelope ID"
                required
            />
            <label htmlFor="amount">Amount:</label>
            <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
                min="0.01"
                step="0.01"
            />
            <button type="submit">Transfer Funds</button>
            {error && <p style={{ color: 'red' }}>Transfer failed: {error}</p>}
        </form>
    );
}

export default TransferFundsForm;