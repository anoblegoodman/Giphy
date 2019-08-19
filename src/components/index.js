import React from 'react';
import { Provider } from 'react-redux';
import store from '../store.js';
import { Router } from './Route'

export const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
); 