import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import {Container} from './client/Container.jsx';

export const App = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);

