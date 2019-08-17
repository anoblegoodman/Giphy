import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import { Giphs } from './containers/Giphs';

export const App = () => (
  <Provider store={store}>
    <Giphs />
  </Provider>
); 

