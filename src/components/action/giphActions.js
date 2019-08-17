import fetch from 'cross-fetch'
import * as types from '../constants/actionTypes.js';
import giphyReducer from '../reducers/giphyReducer'

const API_KEY = 'I2bfcu5IvRbRETTT4hTidiqxECuffcR7';

export function requestGif(searchTerm) {
  return { type: types.REQUEST_GIF, searchTerm };
};

export function receiveGif(searchTerm, json) {
  return { type: types.RECEIVE_GIF, searchTerm, resultReceived:json.data, receivedAt: Date.now() };
};

export function fetchGiph(searchTerm) {
  return dispatch => {
    dispatch(requestGif(searchTerm))
    return fetch(
      `http://api.giphy.com/v1/gifs/translate?s=${searchTerm}&${giphyReducer.weirdness}weirdness=10&api_key=${API_KEY}`
    )
    .then(response => response.json())
    .then(json => console.log('fetched data:', json) || dispatch(receiveGif(searchTerm, json.data)));
  }
}

export const updateWeirdnessScore = weirdness => {
  return { type: types.UPDATE_WEIRDNESS_SCORE, payload: weirdness };
};

export const invalidSearch = error => {
  return { type: types.INVALID_SEARCH, payload: error };
};
