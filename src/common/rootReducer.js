
export const rootReducer = (state = { residents: [{ name: 'manel', phoneNumber: '235' }], assignedResidentName: '', taskOccurence: '' }, action) => {
  switch (action.type) {
    case 'RESIDENTS_RECEIVED':
      return { ...state, residents: action.json };
    case 'SET_RESIDENT':
      return { ...state, assignedResidentName: action.residentName };
    case 'SET_OCCURENCE_TASK':
      return { ...state, taskOccurence: action.occurence };
    case 'TASKS_RECEIVED':
      return { ...state, tasks: action.json };
    default:
      return state;
  }
};
