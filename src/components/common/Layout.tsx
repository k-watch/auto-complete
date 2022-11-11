import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { absoluteCenter } from 'styles/mixins';
import Header from './Header';

const Layout = () => {
  return (
    <S.Wrap>
      <Header />
      <Outlet />
    </S.Wrap>
  );
};

export default Layout;

const S = {
  Wrap: styled.div`
    width: 100%;
  `,
};
