import * as types from '../constants/actionTypes.js';

// export const asyncAction = (currValue) => {
//   return dispatch => {
//     console.log(String(currValue) + ' => ' + String(!currValue) + ' in 3, 2, 1...');
//     return setTimeout(function () {
//       return dispatch({ type: types.ASYNC_ACTION, payload: !currValue })
//     }, 3000);
//   }
// };

export const addLike = totalLiked => {
  const newTotalLiked = totalLiked + 1;
  return { type: types.ADD_LIKE, payload: newTotalLiked };
};

export const removeLike = totalLiked => {
  return { type: types.REMOVE_LIKE, payload: (totalLiked -= 1) };
};

export const removeAllLikes = () => {
  return { type: types.REMOVE_ALL_LIKES, payload: 0 };
};

// export const getGifs = (resultReceived) => {
//   return { type: types.REQUEST_GIF, payload: searchTerm }
// }
