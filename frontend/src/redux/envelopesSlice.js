import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const fetchEnvelopes = createAsyncThunk('envelopes/fetchEnvelopes', async () => {
  const response = await fetch('/api/envelopes');
  if (!response.ok) {
    throw new Error('Failed to fetch envelopes');
  }
  return await response.json();
});

export const addEnvelope = createAsyncThunk('envelopes/addEnvelope', async (envelope) => {
  const response = await fetch('/api/envelopes', {
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
  const response = await fetch(`/api/envelopes/${id}`, {
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
  const response = await fetch(`/api/envelopes/${id}`, {
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
      const response = await fetch('/api/envelopes/transfer', { 
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
      const response = await fetch('/api/envelopes/fund-distribution', {
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
    error: null
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
      .addCase(transferFunds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        const { fromId, toId, updatedEnvelopes } = action.payload;
        // Update amounts for 'from' envelope
        const fromIndex = state.items.findIndex(envelope => envelope.id === fromId);
        if (fromIndex !== -1) {
          state.items[fromIndex] = updatedEnvelopes.find(envelope => envelope.id === fromId);
        }
        // Update amounts for 'to' envelope
        const toIndex = state.items.findIndex(envelope => envelope.id === toId);
        if (toIndex !== -1) {
          state.items[toIndex] = updatedEnvelopes.find(envelope => envelope.id === toId);
        }
      })      
      .addCase(distributeFunds.fulfilled, (state) => {
        state.status = 'succeeded';
    });
  }
});

export default envelopesSlice.reducer;
