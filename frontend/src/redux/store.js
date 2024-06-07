import { configureStore } from '@reduxjs/toolkit';
import envelopesReducer from './envelopesSlice';

export const store = configureStore({
  reducer: {
    envelopes: envelopesReducer,
  },
});

export default store;
