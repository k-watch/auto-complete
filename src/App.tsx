import { store } from 'modules/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyles';
import Theme from 'styles/theme';
import Router from './routes';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
