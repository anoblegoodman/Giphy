import {
  ADD_LIKE,
  REMOVE_LIKE,
  REMOVE_ALL_LIKES
} from '../constants/actionTypes';

const initialState = () => {
  return {
    totalLiked: 0,
  };
};

const likesReducer = (state = initialState(), action) => {
  switch (action.type) {
    case ADD_LIKE:
      return {
        ...state,
        totalLiked: action.payload
      };
    case REMOVE_LIKE:
      return {
        ...state,
        totalLiked: action.payload
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