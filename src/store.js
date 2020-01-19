import { combineReducers, createStore, applyMiddleware, compose  } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga'
import { saga } from './common/sagas'

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const sagaMiddleware = createSagaMiddleware();

//const initialState = { counter: { count:0 } };
const store = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension && window.devToolsExtension(),
)(createStore)(reducer);
sagaMiddleware.run(saga);

//store.dispatch(requestGetResidents());

export default store;
