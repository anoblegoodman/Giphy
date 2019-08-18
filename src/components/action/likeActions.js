import * as types from '../constants/actionTypes.js';

export const addLike = ({gifUrl, gifWeirdness, gifSearchTerm}) => {
  return { type: types.ADD_LIKE, payload: { url: gifUrl, searchTerm: gifSearchTerm, weirdness: gifWeirdness }};
};

export const removeLike = ({ gifUrl, gifWeirdness, gifSearchTerm }) => {
  return { type: types.REMOVE_LIKE, payload: { url: gifUrl, searchTerm: gifSearchTerm, weirdness: gifWeirdness }};
};

export const removeAllLikes = () => {
  return { type: types.REMOVE_ALL_LIKES, payload: 0 };
};