import { SearchContextProvider } from 'modules/context/SearchContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyles';
import Theme from 'styles/theme';
import Router from './routes';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <SearchContextProvider>
          <Router />
        </SearchContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
