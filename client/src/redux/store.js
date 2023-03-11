import { configureStore } from '@reduxjs/toolkit';
import measures from './tableSlice';
import app from './appSlice'

const store = configureStore({
  reducer: {
    measures,
    app
  }
});

export default store;