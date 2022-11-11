import { SearchInterface } from 'types/api';
import { SearchMoveDirType, SEARCH_MOVE_DIR } from 'types/enum';
import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchWord: string;
  searchList: SearchInterface[];
  searchMoveIndex: number;
  searchMoveDir: SearchMoveDirType;
}

const initialState: SearchState = {
  searchWord: '',
  searchList: [],
  searchMoveIndex: 0,
  searchMoveDir: SEARCH_MOVE_DIR.UP,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchWord(state, { payload: word }) {
      state.searchWord = word;
    },
    setSearchList(state, { payload: list }) {
      state.searchList = [...list];
    },
    setSearchMoveIndex(state, { payload: index }) {
      state.searchMoveIndex = index;
    },
    setSearchMoveDir(state, { payload: dir }) {
      state.searchMoveDir = dir;
    },
  },
});

export const {
  setSearchWord,
  setSearchList,
  setSearchMoveIndex,
  setSearchMoveDir,
} = searchSlice.actions;

export const searchSelector = (state: any) => state.search;

export default searchSlice.reducer;
