
export const rootReducer = (state = { residents: [], assignedResidentName: '', taskOccurence: '' }, action) => {
  switch (action.type) {
    case 'RESIDENTS_RECEIVED':
      return { ...state, residents: action.json };
    case 'SET_RESIDENT':
      return { ...state, assignedResidentName: action.residentName };
    case 'SET_OCCURENCE_TASK':
      return { ...state, taskOccurence: action.occurence };
    case 'RESIDENT_DELETED':
      const residents = state.residents.filter(resident => resident._id !== action.id);
      return { ...state, residents };
    case 'TASK_DELETED':
      const tasks = state.tasks.filter(task => task._id !== action.id);
      return { ...state, tasks: tasks };
    case 'TASKS_RECEIVED':
      return { ...state, tasks: action.json };
    case 'TASK_DATA_RECEIVED':
      return { ...state, taskData: action.json };
    default:
      return state;
  }
};
