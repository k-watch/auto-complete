import Layout from 'components/common/Layout';
import MainPage from 'pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NAVIGATE_URL } from 'types/enum';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={NAVIGATE_URL.MAIN} element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
