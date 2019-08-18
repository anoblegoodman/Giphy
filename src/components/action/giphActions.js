import fetch from 'cross-fetch'
import * as types from '../constants/actionTypes.js';

const API_KEY = 'I2bfcu5IvRbRETTT4hTidiqxECuffcR7';

// export function requestGif(searchTerm) {
//   return { type: types.REQUEST_GIF, searchTerm };
// };

// export function receiveGif(searchTerm, json) {
//   return { type: types.RECEIVE_GIF, searchTerm, resultReceived:json.data, receivedAt: Date.now() };
// };

//original shit
// export function fetchGiph(searchTerm) {
//   return dispatch => {
//    // dispatch(requestGif(searchTerm))
//     return fetch(
//       `http://api.giphy.com/v1/gifs/translate?s=${searchTerm}&${giphyReducer.weirdness}weirdness=10&api_key=${API_KEY}`
//     )
//     .then(response => response.json())
//     .then(json => console.log('fetched data:', json) || dispatch(receiveGif(searchTerm, json.data)));
//   }
// }

export function fetchGiph(searchTerm) {
  const weirdness = 1;
  const url = `http://api.giphy.com/v1/gifs/translate?s=${searchTerm}&${weirdness}weirdness=10&api_key=${API_KEY}`
  return (dispatch) => {
    //dispatch(itemsIsLoading(true));
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

export const invalidSearch = error => {
  return { type: types.INVALID_SEARCH, payload: error };
};
