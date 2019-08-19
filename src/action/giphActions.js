import fetch from 'cross-fetch'
import * as types from '../constants/actionTypes.js';

const API_KEY = 'I2bfcu5IvRbRETTT4hTidiqxECuffcR7';

export function fetchGiph(searchTerm, weirdness) {
  const url = `http://api.giphy.com/v1/gifs/translate?s=${searchTerm}&weirdness=${weirdness}&api_key=${API_KEY}`
  return (dispatch) => {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((giphies) => dispatch({ type: types.FETCH_GIF, payload: { giphies: giphies.data, searchTerm, weirdness }}))
        .catch((error) => dispatch({ type: 'ERROR', payload: error }));
  };
}

export const updateWeirdnessScore = weirdness => {
  return { type: types.UPDATE_WEIRDNESS_SCORE, payload: weirdness };
};
