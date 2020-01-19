export const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RESIDENTS_RECEIVED':
      return { ...state, news: action.json };
    default:
      return state;
  }
};
