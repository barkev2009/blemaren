import { configureStore } from '@reduxjs/toolkit';
import reducer from './tableSlice'

const store = configureStore({
  reducer: {
    measures: reducer
  }
});

export default store;