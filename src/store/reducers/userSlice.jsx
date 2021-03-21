import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLoggedIn(state,action) {
        state.isLoggedIn = action.payload;
    }
  },
});

export const {setLoggedIn} = userSlice.actions;

export default userSlice.reducer;