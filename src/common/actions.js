import axios from 'axios'

// residents
export const SET_RESIDENTS = 'SET_RESIDENTS';
export const setResidents = residents => ({type: SET_RESIDENTS, payload: residents});

export const REQUEST_GET_RESIDENTS = 'REQUEST_GET_RESIDENTS';
//export const getResidents = () => dispatch => {dispatch({ type: REQUEST_GET_RESIDENTS });};
export const getResidents = ()  => ({ type: "REQUEST_GET_RESIDENTS" });
// residents
/*export const requestGetResidents = () => async dispatch => {
  try {
    const {data: {residents}} = await axios.get('/api/residents');
    dispatch(setResidents(residents))
  } catch (e) {
    console.error(e)
  }
};*/
