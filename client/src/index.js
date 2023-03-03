import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './redux/tableSlice'

const store = configureStore({
  reducer: {
    measures: reducer
  }
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

