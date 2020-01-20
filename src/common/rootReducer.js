
export const rootReducer = (state = {residents: [{name:'manel', phoneNumber:'235'}]}, action) => {
  switch (action.type) {
    case 'RESIDENTS_RECEIVED':
      return { ...state, residents: action.json };
    default:
      return state;
  }
};
