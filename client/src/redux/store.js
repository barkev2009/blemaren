import { configureStore } from '@reduxjs/toolkit';
import measures from './tableSlice';
import app from './appSlice';
import course from './courseSlice';

const store = configureStore({
  reducer: {
    measures,
    app,
    course
  }
});

export default store;