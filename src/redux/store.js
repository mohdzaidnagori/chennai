import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/loginSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});