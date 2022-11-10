import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { absoluteCenter } from 'styles/mixins';

const Layout = () => {
  return (
    <S.Wrap>
      <Outlet />
    </S.Wrap>
  );
};

export default Layout;

const S = {
  Wrap: styled.div`
    ${absoluteCenter()};
    width: 100%;
    height: 700px;
    background-color: #cde7fe;
  `,
};
