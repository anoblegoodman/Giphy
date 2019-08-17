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
  switch (action.type) {
    default:
      return state;
  }
};

export default giphyReducer;
