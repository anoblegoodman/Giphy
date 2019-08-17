import { combineReducers } from 'redux';
import giphyReducer from './giphyReducer';
import likesReducer from './likesReducer'

const reducers = combineReducers({
  giphyReducer: giphyReducer,
  likesReducer: likesReducer
});

export default reducers;
