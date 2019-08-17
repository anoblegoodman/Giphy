import { FETCH_GIF } from "../constants/actionTypes";

const initialState = () => {
  return {
    resultReceived: [],
    weirdness: 0,
    error: null,
    loading: false,
    searchTerm: ''
  }
};

const giphyReducer = (state = initialState(), action) => {
  console.log('GIPHY REDUCER', action)
  switch (action.type) {
    case FETCH_GIF:
      return {
        ...state,
        resultReceived: action.payload
      };
    default:
      return state;
  }
};

export default giphyReducer;
