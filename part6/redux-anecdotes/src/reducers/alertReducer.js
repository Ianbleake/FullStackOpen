import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: null,
  reducers: {
    addAlert: (state, action) => {
      const newAlert = action.payload;
      state.push(newAlert);
    },
    removeAlert: (state, action) => {
      return state.filter((alert, index) => index !== action.payload);
    },
    clearAlerts: () => {
      return null;
    }
  }
});

export const { addAlert, removeAlert, clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;
