import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { distributeFunds } from '../redux/envelopesSlice';

function DistributeFundsForm() {
    const [totalAmount, setTotalAmount] = useState('');
    const [envelopeIds, setEnvelopeIds] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const idsArray = envelopeIds.split(',').map(id => id.trim());
        dispatch(distributeFunds({ totalAmount, envelopeIds: idsArray }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Total Amount"
                required
            />
            <input
                type="text"
                id="envelopeIds"
                name="envelopeIds"
                value={envelopeIds}
                onChange={(e) => setEnvelopeIds(e.target.value)}
                placeholder="Envelope IDs (comma-separated)"
                required
            />
            <button type="submit">Distribute Funds</button>
        </form>
    );
}

export default DistributeFundsForm;