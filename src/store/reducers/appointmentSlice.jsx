import {createSlice} from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    list: [],
  },
  reducers: {
    pushAppointment(state,action) {
        state.list.push(action.payload);
    },
    updateAppointment(state,action) {
        var item = action.payload;
        var newList = [...state.list];
        var foundIndex = newList.findIndex(x => x.id == item.id);
        newList[foundIndex] = item;
        state.list = newList;
    },
    deleteAppointment(state,action) {
      var item = action.payload;
      var newList = [...state.list];
      var foundIndex = newList.findIndex(x => x.id == item.id);
      state.list.splice(foundIndex,1);
    }
  },
});

export const {pushAppointment, updateAppointment,deleteAppointment} = appointmentSlice.actions;

export default appointmentSlice.reducer;