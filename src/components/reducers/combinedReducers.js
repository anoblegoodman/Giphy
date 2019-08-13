import { combineReducers } from 'redux';
import giphyReducer from './giphyReducer.js';

const reducers = combineReducers({
  giphyReducer: giphyReducer
});

export default reducers;
