import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: null,  
  reducers: {
    addAlert: (state, action) => {
      console.log("add:",action.payload)
      return action.payload;  
    },
    clearAlerts: () => {
      return null;  
    }
  }
});

export const { addAlert, clearAlerts } = alertSlice.actions;

export const SetAlert = (content,time) => {
  console.log("Alert:", content,time)
  return async dispatch => {
    await dispatch(addAlert(content))
    setTimeout(()=>{
      dispatch(clearAlerts())
    },time)
  }
}
export default alertSlice.reducer;
