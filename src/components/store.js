import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers  from './reducers/combinedReducers.js';
import { fetchGif } from './action/giphActions'


//the store, enhanced with thunk middleware to allow for async action in redux.
const store = createStore(
	reducers,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;

