import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { transferFunds } from '../redux/envelopesSlice';

function TransferFundsForm() {
    const [fromId, setFromId] = useState('');
    const [toId, setToId] = useState('');
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(transferFunds({ fromId, toId, amount: parseFloat(amount) }));
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
                min="0.01" // Minimum amount you can transfer
                step="0.01" // Step for the numeric input
            />
            <button type="submit">Transfer Funds</button>
        </form>
    );
}

export default TransferFundsForm;
