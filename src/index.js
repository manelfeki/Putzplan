import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider , createMuiTheme } from '@material-ui/core/styles';
import store from './store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { getResidents } from './common/actions';

store.dispatch(getResidents());

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider  theme={createMuiTheme()}>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
