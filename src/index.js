import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import store from './store';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider  theme={getMuiTheme()}>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
