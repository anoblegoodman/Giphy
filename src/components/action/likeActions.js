import * as types from '../constants/actionTypes.js';

export const addLike = ({gifUrl, gifWeirdness, gifSearchTerm}) => {
  console.log(gifUrl, gifWeirdness, gifSearchTerm)
  return { type: types.ADD_LIKE, payload: { gifUrl, gifSearchTerm, gifWeirdness }};
};

export const removeLike = totalLiked => {
  return { type: types.REMOVE_LIKE, payload: (totalLiked -= 1) };
};

export const removeAllLikes = () => {
  return { type: types.REMOVE_ALL_LIKES, payload: 0 };
};