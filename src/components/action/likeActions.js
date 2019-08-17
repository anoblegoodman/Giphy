import * as types from '../constants/actionTypes.js';

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