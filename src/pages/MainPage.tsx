import SearchBar from 'components/SearchBar';
import SearchList from 'components/SearchList';
import styled from 'styled-components';
import { absoluteCenter, flexBox } from 'styles/mixins';

const MainPage = () => {
  return (
    <S.Wrap>
      <SearchBar />
      <SearchList />
    </S.Wrap>
  );
};

export default MainPage;

const S = {
  Wrap: styled.div`
    ${absoluteCenter()};
    width: 400px;
  `,
};
