import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import {Container} from './client/Container.jsx';

export const App = () => (
  <Provider store={store}>
    <Container falseProp={'testing a passed in prop'} />
  </Provider>
);

