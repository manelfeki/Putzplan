
export const rootReducer = (state = [], action) => {
  switch (action.type) {
    case 'RESIDENTS_RECEIVED':
      return { ...state, residents: action.json };
    case 'TASKS_RECEIVED':
      return { ...state, tasks: action.json };

    default:
      return state;
  }
};
