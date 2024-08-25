import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchEnvelopes = createAsyncThunk('envelopes/fetchEnvelopes', async () => {
  const response = await fetch(`${API_BASE_URL}/api/envelopes`);
  if (!response.ok) {
    throw new Error('Failed to fetch envelopes');
  }
  return await response.json();
});

export const addEnvelope = createAsyncThunk('envelopes/addEnvelope', async (envelope) => {
  const response = await fetch(`${API_BASE_URL}/api/envelopes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(envelope)
  });
  if (!response.ok) {
    throw new Error('Failed to add envelope');
  }
  return await response.json();
});

// Update an envelope
export const updateEnvelope = createAsyncThunk('envelopes/updateEnvelope', async ({ id, envelope }) => {
  const response = await fetch(`${API_BASE_URL}/api/envelopes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(envelope)
  });
  if (!response.ok) {
    throw new Error('Failed to update envelope');
  }
  return await response.json();
});

// Delete an envelope
export const deleteEnvelope = createAsyncThunk('envelopes/deleteEnvelope', async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/envelopes/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete envelope');
  }
  return id;
});

//transfer
export const transferFunds = createAsyncThunk('envelopes/transferFunds', async ({ fromId, toId, amount }, { rejectWithValue }) => {
  try {
      const response = await fetch(`${API_BASE_URL}/api/envelopes/transfer`, { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fromId, toId, amount })
      });
      if (!response.ok) {
          throw new Error('Failed to transfer funds');
      }
      return await response.json();
  } catch (error) {
      return rejectWithValue(error.message);
  }
});

//fund distribution
export const distributeFunds = createAsyncThunk('envelopes/distributeFunds', async ({ totalAmount, envelopeIds }, { rejectWithValue }) => {
  try {
      const response = await fetch(`${API_BASE_URL}/api/envelopes/fund-distribution`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalAmount, envelopeIds })
      });
      if (!response.ok) {
          throw new Error('Failed to distribute funds');
      }
      return await response.json();
  } catch (error) {
      return rejectWithValue(error.message);
  }
});


const envelopesSlice = createSlice({
  name: 'envelopes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    fundDistributionStatus: 'idle',  // Initialize fundDistributionStatus
    transferStatus: 'idle',  // Initialize transferStatus
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnvelopes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEnvelopes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEnvelopes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEnvelope.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEnvelope.fulfilled, (state, action) => {
        const index = state.items.findIndex(envelope => envelope.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteEnvelope.fulfilled, (state, action) => {
        state.items = state.items.filter(envelope => envelope.id !== action.payload);
      })
      .addCase(transferFunds.pending, (state) => {
        state.transferStatus = 'loading';
      })
      .addCase(transferFunds.fulfilled, (state, action) => {
        state.transferStatus = 'succeeded';
        
        const { fromId, toId, updatedEnvelopes } = action.payload;
    
        console.log('Transfer succeeded:', action.payload);
        
        const updatedItems = state.items.map(envelope => {
            if (envelope.id === fromId || envelope.id === toId) {
                return updatedEnvelopes.find(updatedEnvelope => updatedEnvelope.id === envelope.id);
            }
            return envelope;
        });
    
        state.items = updatedItems;
        console.log('Updated envelopes in state:', state.items);
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.transferStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(distributeFunds.pending, (state) => {
        state.fundDistributionStatus = 'loading';
      })
      .addCase(distributeFunds.fulfilled, (state, action) => {
        state.fundDistributionStatus = 'succeeded';
      })
      .addCase(distributeFunds.rejected, (state, action) => {
        state.fundDistributionStatus = 'failed';
        state.error = action.payload;
      });
  }
});

export default envelopesSlice.reducer;
