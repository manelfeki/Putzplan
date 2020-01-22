import { combineReducers, createStore, applyMiddleware, compose  } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga'
import { saga } from './common/sagas'
import {rootReducer} from './common/rootReducer'

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  rootReducer
});
const sagaMiddleware = createSagaMiddleware();

const store = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension && window.devToolsExtension(),
)(createStore)(reducer);
sagaMiddleware.run(saga);



export default store;
