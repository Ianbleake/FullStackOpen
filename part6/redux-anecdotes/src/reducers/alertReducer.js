import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: null,  
  reducers: {
    addAlert: (state, action) => {
      return action.payload;  
    },
    clearAlerts: () => {
      return null;  
    }
  }
});

export const { addAlert, clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;
