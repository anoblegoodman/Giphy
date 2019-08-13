const initialState = {
  searchTerm: '',
  resultReceived: {},
  weirdness: 0,
  totalLiked: 0,
  usersLikes: {}
};

const giphyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIKE':
      console.log(action);
      return {
        ...state,
        totalLiked: action.payload
      };
    case 'REMOVE_LIKE':
      return {
        ...state,
        totalLiked: action.payload
      };
    case 'REMOVE_ALL_LIKES':
      return {
        ...state,
        totalLiked: action.payload
      };
    default:
      return state;
  }
};

export default giphyReducer;
