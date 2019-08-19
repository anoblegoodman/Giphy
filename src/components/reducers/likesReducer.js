import {
  ADD_LIKE,
  REMOVE_LIKE,
  REMOVE_ALL_LIKES
} from '../constants/actionTypes';

const initialState = () => {
  return {
    totalLikedGifs: []
  };
};

const likesReducer = (state = initialState(), action) => {
  switch (action.type) {
    case ADD_LIKE:
      const totalLikedGifsCopy = [...state.totalLikedGifs];
      totalLikedGifsCopy.push(action.payload);
      return {
        totalLikedGifs: totalLikedGifsCopy
      };
    case REMOVE_LIKE:
      const { payload } = action;
      const totalLikedGifs = [...state.totalLikedGifs];
      const withoutRemoved = totalLikedGifs.filter(liked => {
        return (
          payload.url !== liked.url &&
          payload.searchTerm !== liked.searchTerm &&
          payload.url !== liked.weirdness
        );
      });
      return {
        ...state,
        totalLikedGifs: withoutRemoved
      };
    case REMOVE_ALL_LIKES:
      return {
        ...state,
        totalLiked: action.payload
      };
    default:
      return state;
  }
};

export default likesReducer;
