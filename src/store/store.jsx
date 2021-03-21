import {configureStore} from '@reduxjs/toolkit';
import {loadState, saveState} from '../services/localStorage';
import userReducer from './reducers/userSlice';
import appointmentReducer from './reducers/appointmentSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    appointment: appointmentReducer,
  },
  preloadedState: loadState()
});
store.subscribe(()=>{
  saveState(store.getState());
});
export default store;