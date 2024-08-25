import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnvelopes } from '../redux/envelopesSlice';
import EnvelopeForm from '../components/EnvelopeForm';
import EnvelopeList from '../components/EnvelopeList';
import TransferFundsForm from '../components/TransferFundsForm';
import DistributeFundsForm from '../components/DistributeFundsForm';

function Envelopes() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.envelopes);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [showDistributeForm, setShowDistributeForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEnvelopes());
  }, [dispatch]);

  // Subscribe to changes in Redux store for fund distribution and transfers
  const fundDistributionStatus = useSelector(state => state.envelopes.fundDistributionStatus);
  const transferStatus = useSelector(state => state.envelopes.transferStatus);

  // Trigger re-renders when fund distribution or transfer status changes
  useEffect(() => {
    if (fundDistributionStatus === 'succeeded' || transferStatus === 'succeeded') {
      console.log('Dispatching fetchEnvelopes...');
      dispatch(fetchEnvelopes());
    }
  }, [fundDistributionStatus, transferStatus, dispatch]);

  const toggleTransferForm = () => setShowTransferForm(!showTransferForm);
  const toggleDistributeForm = () => setShowDistributeForm(!showDistributeForm);

  return (
    <div className="container">
      <h1>Envelopes</h1>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={toggleTransferForm}>Transfer Funds</button>
      <button onClick={toggleDistributeForm}>Distribute Funds</button>
      {showTransferForm && <TransferFundsForm />}
      {showDistributeForm && <DistributeFundsForm />}
      <EnvelopeForm />
      <EnvelopeList envelopes={items} />
    </div>
  );
}

export default Envelopes;