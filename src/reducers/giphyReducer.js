import { FETCH_GIF } from "../constants/actionTypes";

const initialState = () => {
  return {
    currentGiph: { url: '', searchTerm: '', weirdness: 0},
    error: null,
    loading: false,
    searchTerm: ''
  }
};

const giphyReducer = (state = initialState(), action) => {
  switch (action.type) {
    case FETCH_GIF:
      const { giphies, searchTerm, weirdness } = action.payload || {}
      const { images } = giphies || {}
      const { original } = images || {}
      const { url } = original || {}
      return {
        ...state,
        currentGiph: { url: url, searchTerm, weirdness}
      };
    default:
      return state;
  }
};

export default giphyReducer;
