import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './jobSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;