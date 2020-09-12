import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider as UrqlProvider, createClient } from 'urql';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import MetricsContainer from './Features/Metrics/MetricsContainer';

const store = createStore();

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <UrqlProvider value={client}>
      <Provider store={store}>
        <Wrapper>
          <Header />
          <MetricsContainer />
          <ToastContainer />
        </Wrapper>
      </Provider>
    </UrqlProvider>
  </MuiThemeProvider>
);

export default App;
