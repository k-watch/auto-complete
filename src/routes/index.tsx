import MainPage from 'pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NAVIGATE_URL } from 'types/enum';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={NAVIGATE_URL.MAIN} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
